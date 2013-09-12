var config = config || {
    unpackProjects: ["all"]      // 配置需要打包的项目名，若配置 unpackProjects: 'all', 则打包所有项目。
};

/**
 *  config.projects 为一个对象数组，一个对象是一个项目。
 *
 *  每个项目有对应的：
 *      projectName: 项目名称
 *      rootPath: 项目路径
 *      buildPath: 项目打包路径
 *      resources: 资源打包配置项 
 *      images: 图片打包配置项
 *      js: js 文件打包配置项
 *      css: css 文件打包配置项
 *  
 *   config.projects 数组中可配置多个承载多个对象，配置多个项目。
 *   使 N-Builder 能支持同时打包多个项目。
 *   注：若路径配置为文件夹路径时，N-Builder 会递归处理该文件夹下所有合法文件。
 */
config.projects = [{
    projectName: 'Slib',        
    rootPath: '../dev/',       
    buildPath: '../production/',         
    js: {         
        compression: [{
            dir: [
                "sl.js", 
                "log/",
                "array/"
            ],             
            outputFile: 'slib.pro.js'
        }],
    }
}];

module.exports = config;