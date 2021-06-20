import React from 'react';
import './EditorHolder.css';
import IFrameCommunicator from '../Utils/IFrameCommunicator';
import EditorHolderController from './EditorHolderController';
import { Server } from '../Contexts/WeblancerContext';
import { WeblancerContext } from './../Contexts/WeblancerContext';
import EditorHolderHeader from './EditorHolderHeader';
import EditorHolderLoading from './EditorHolderLoading';
import PublishWebsite from './Components/PublishWebsite';
import {parse, stringify} from 'flatted';

export default class EditorHolder extends React.Component {
    static contextType = WeblancerContext;

    constructor (props) {
        super(props);

        let pathname = window.location.pathname;
        let paths = pathname.split('/');
        let websiteId = paths[paths.length - 1];

        this.state = {
            loading: true,
            websiteId,
            website: undefined,
            zoomScale: 1,
            progress: {open: false}
        };

        this.editorIframe = React.createRef();
    }

    init = () => {
        this.iFrameCommunicator = new IFrameCommunicator(undefined, "WeblancerIFrameCommunicator",
            this.getIframeWindow, this.onMessage);
    }

    componentDidMount(){
        this.mounted = true;
        this.init();
        this.load();
    }

    registerKeyEvent = () => {
        window.addEventListener("keydown",(e) =>{
            let jsonedEvent = {
                which: e.which,
                keyCode: e.keyCode,
                ctrlKey: e.ctrlKey,
                type: "keydown",
            };

            e.preventDefault();
            
            console.log("jsonedEvent", e, jsonedEvent);
            this.postMessage({
                type: "Event",
                inputs: [jsonedEvent]
            });
        });
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    onMessage = (data, res) => {
        EditorHolderController.onMessage(data, res, this);
    };

    getIframeWindow = () => {
        return this.editorIframe.current && this.editorIframe.current.contentWindow;
    };

    postMessage = (data, callback) => {
        this.iFrameCommunicator.post(data, callback);
    };

    changePageZoom = (zoomScale, callback) => {
        this.setState({zoomScale}, () => {
            callback(zoomScale);
        })
    };

    onEditorMounted = (callback) => {
        let {websiteId} = this.state;
        
        this.registerKeyEvent();

        Server.getWebsite(websiteId, (success, data, error) => {
            if (success) {
                console.log("website", data.website);
                this.postMessage({
                    type: "Editor",
                    func: "onSiteDataUpdated",
                    inputs: [data.website.metadata && data.website.metadata.siteData, websiteId]
                });

                this.setState({website: data.website})
            }
        });

        callback(this.getInitDataForEditor());

        this.setState({editorMounted: true, preview: false});
    };

    getInitDataForEditor = () => {
        return {
            zoomScale: this.state.zoomScale
        };
    }

    load = () => {
        let {websiteId} = this.state;

        Server.requestEditor(websiteId, (success, data, error) => {
            console.log("load", success)
            if (success) {
                this.fetchLongProcessAsync(data.longProcessId);
            }
        });
    };

    fetchLongProcessAsync = (longProcessId) => {
        let time = 0;
        console.log("fetchLongProcessAsync", 1)
        this.fetchLongProcess(longProcessId);
        console.log("fetchLongProcessAsync", 1.5)
        this.loadingInterval = setInterval(() => {
            time += 5;
            console.log("fetchLongProcessAsync", 2)
            this.fetchLongProcess(longProcessId);
        }, 5000);
    };

    fetchLongProcess = (longProcessId) => {
        Server.getLongProcess(longProcessId, (success, data, error) => {
            console.log("fetchLongProcessAsync",3)
            if (success) {
                console.log("fetchLongProcessAsync",4)
                if (data.longProcess.state === 'complete') {
                    console.log("fetchLongProcessAsync", 5)
                    clearInterval(this.loadingInterval);
                    this.setState({
                        // TODO for test
                        editorUrl: "http://localhost:3001",
                        //editorUrl: data.longProcess.metaData.url,
                        editorLongProcessId: data.longProcess.id
                    });
                }
            }
        })
    };

    getzoomScaleStyle = () => {
        let {zoomScale} = this.state;
        
        if (!zoomScale)
            return;

        return {
            transform: `scale(${zoomScale})`,
            transformOrigin: "0 0",
            width: `${1/zoomScale*100}%`,
            height: `${1/zoomScale*100}%`
        };
    }

    restoreEditor = (e) => {
        Server.deleteEditor(this.state.editorLongProcessId, (success, data, error) => {
            if (success) {
                this.setState({
                    editorUrl: undefined,
                    editorLongProcessId: undefined,
                    editorMounted: undefined
                });
                this.load();
            }
        })
    };

    saveWebsite = (silence, callback) => {
        this.setState({
            progress: {open: true},
            saving: true
        });

        console.log("saveWebsite 1")
        this.postMessage({
            type: "Editor",
            func: "getSiteData",
            inputs: []
        }, (data) => {
            let siteData = data.result;
            let websiteId = this.state.website.id;
            let name = this.state.website.name;
            let description = this.state.website.description;

            Server.saveWebsite(websiteId, name, description, siteData, (success, data, error) => {
                this.setState({
                    progress: {open: false},
                    saving: false
                });
                if (success) {
                    !silence && this.context.showSnackbar('Website saved successfully', 'success');
                    callback && callback(true);
                } else {
                    !silence && this.context.showSnackbar('Failed to save website', 'error');
                    callback && callback(false);
                }
            })
        });
    }

    onPreview = () => {
        this.postMessage({
            type: "Editor",
            func: "setPreview",
            inputs: [true]
        });
        this.setState({preview: true});
    }

    onEditMode = (callback) => {
        this.setState({preview: false}, callback);
    }

    onPublishClick = () => {
        console.log("onPublishClick")
        this.saveWebsite(true, () => {
            this.setState({
                publishing: true
            });
        });
    }

    render () {
        let {websiteId, editorUrl, editorMounted, publishing, saving} = this.state;
        return (
            <div className="EditorHolderPage">
                {
                    editorUrl && 
                    <>
                        {
                            !this.state.preview &&
                            <EditorHolderHeader
                                restoreEditor={this.restoreEditor}
                                saveWebsite={this.saveWebsite}
                                onPreview={this.onPreview}
                                onPublishClick={(!saving && !publishing) ? this.onPublishClick : undefined}
                            />
                        }
                        <div className="EditorHolderIFrame">
                            {
                                editorUrl &&
                                <iframe title="Editor" className="EditorIFrame" src={editorUrl}
                                        ref={this.editorIframe}
                                        style={{...this.getzoomScaleStyle()}}
                                />
                            }
                        </div>
                    </>
                }
                {
                    (!editorUrl || !editorMounted) &&
                    <EditorHolderLoading/>
                }
                {
                    (publishing) &&
                    <PublishWebsite 
                        websiteId={websiteId} 
                        onClose={() => {this.setState({publishing: undefined})}}
                    />
                }
            </div>
        )
    }
}
