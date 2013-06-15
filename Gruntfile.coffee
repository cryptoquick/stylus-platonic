fs = require 'fs'

list_files = (path, ext) =>
    fs.readdirSync(path).filter (file) =>
        ~file.indexOf ext
    .map (file) =>
        file.replace ext, ''

module.exports = ( grunt ) ->

    files = 
        jade  : {}
        styl  : {}

    styl = list_files __dirname + '/test/cases/styl', '.styl'
    jade = list_files __dirname + '/test/cases/jade', '.jade'

    for file in styl
        src  = __dirname + '/test/cases/styl/' + file + '.styl'
        dest = __dirname + '/test/public/css/' + file + '.css'
        files.styl[dest] = src

    for file in jade
        src  = __dirname + '/test/cases/jade/'  + file + '.jade'
        dest = __dirname + '/test/public/' + file + '.html'
        files.jade[dest] = src
    
    grunt.initConfig

        jade:
            compile:
                options: 
                    pretty: true
                
                files: files.jade
            
        
        stylus: 
            compile: 
                options: 
                    compress: false,
                    use: [
                        require 'nib'
                        require './'
                    ]
                
                files: files.styl
            
        watch: 
            all: 
                files: [
                     './test/cases/styl/**/*.styl'
                    ,'./test/cases/jade/**/*.jade'
                ],
                tasks: [
                    'stylus',
                    'jade'
                ]
            
            css: 
                files: [
                    './test/cases/styl/**/*.styl'
                ],
                tasks: [
                    'stylus'
                ]
            
            html: 
                files: [
                    './test/cases/jade/**/*.jade'
                ]
                tasks: [
                    'jade'
                ]
            

    grunt.loadNpmTasks 'grunt-contrib-jade'
    grunt.loadNpmTasks 'grunt-contrib-stylus'
    grunt.loadNpmTasks 'grunt-contrib-watch'

    grunt.registerTask 'default', [ 'watch:all'  ]
    grunt.registerTask 'css',     [ 'watch:css'  ]
    grunt.registerTask 'html',    [ 'watch:html' ]