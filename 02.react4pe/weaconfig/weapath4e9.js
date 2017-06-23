
exports.getPath = function(config) {
    const apps = {
        //前台主入口
        "main":{ 
            entry:config.srcPath+"/src4js/pc/main/index.js",
            output:config.runPath+"/wui/theme/ecology9/js/index.js",
            styleUrl:config.runPath+"/wui/theme/ecology9/css/index.css"
        },
        //流程弹出页公共文件整合包
        "coms_global":{
            entry:config.srcPath+"/src4js/pc/coms/global/js/index.js",
            output:config.runPath+"/spa/workflow/global.js",
            styleUrl:config.runPath+"/spa/workflow/global.css"
        },
        //流程
        "workflow":{
            entry:config.srcPath+"/src4js/pc/workflow/index.js",
            output:config.runPath+"/spa/workflow/index.js",
            styleUrl:config.runPath+"/spa/workflow/index.css",
            outputlib:{
                library:"weaWorkflow",
                libraryTarget: "umd"
            }
        },
        //流程（开发版，用于表单编辑）
        "workflow4dev":{
            entry:config.srcPath+"/src4js/pc/workflow4dev/index.js",
            output:config.runPath+"/spa/workflow/index.js",
            styleUrl:config.runPath+"/spa/workflow/index.css",
            outputlib:{
                library:"weaWorkflow",
                libraryTarget: "umd"
            }
        },
        //支持流程独立运行的入口
        "workflow4dev_single":{ 
            entry:config.srcPath+"/src4js/pc/workflow4dev/single.js",
            output:config.runPath+"/spa/workflow/index4single.js"
        },
        //门户
        "portal": {
            entry: config.srcPath+"/src4js/pc/portal/index.js",
            output: config.runPath+"/spa/portal/index.js",
            styleUrl: config.runPath+"/spa/portal/index.css",
            outputlib: {
                library: 'weaPortal',
                libraryTarget: 'umd'
            }
        },
        //文档
        "document":{
            entry:config.srcPath+"/src4js/pc/document/index.js",
            output:config.runPath+"/spa/document/index.js",
            styleUrl:config.runPath+"/spa/document/index.css",
            outputlib:{
                library:"weaDoc",
                libraryTarget: "umd"
            }
        },
        //微博
        "blog":{
            entry:config.srcPath+"/src4js/pc/blog/index.js",
            output:config.runPath+"/spa/blog/index.js",
            styleUrl:config.runPath+"/spa/blog/index.css",
            outputlib:{
                library:"weaDoc",
                libraryTarget: "umd"
            }
        },
        //财务
        "fna":{
            entry:config.srcPath+"/src4js/pc/fna/index.js",
            output:config.runPath+"/spa/fna/index.js",
            styleUrl:config.runPath+"/spa/fna/index.css",
            outputlib:{
                library:"weaFna",
                libraryTarget: "umd"
            }
        },
        //会议
        "meeting":{
            entry:config.srcPath+"/src4js/pc/meeting/index.js",
            output:config.runPath+"/spa/meeting/index.js",
            styleUrl:config.runPath+"/spa/meeting/index.css",
            outputlib:{
                library:"weaMeeting",
                libraryTarget: "umd"
            }
        },
        //人力
        "hrm":{
            entry:config.srcPath+"/src4js/pc/hrm/index.js",
            output:config.runPath+"/spa/hrm/index.js",
            styleUrl:config.runPath+"/spa/hrm/index.css",
            outputlib:{
                library:"weaHrm",
                libraryTarget: "umd"
            }
        },
        //集成
        "inte":{
            entry:config.srcPath+"/src4js/pc/inte/index.js",
            output:config.runPath+"/spa/inte/index.js",
            styleUrl:config.runPath+"/spa/inte/index.css",
            outputlib:{
                library:"weaInte",
                libraryTarget: "umd"
            }
        },
        //后台入口
        "bs_main":{ 
            entry:config.srcPath+"/src4js/pc4backstage/main/index.js",
            output:config.runPath+"/wui/theme/ecology9/js/engine.js",
            styleUrl:config.runPath+"/wui/theme/ecology9/css/engine.css"
        }
    }
    return apps[config.name];
}