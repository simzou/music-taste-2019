Todo:
- [x] add equivalent tools to compile / transpile / translate html/css/js from their dev versions and achieve same result
    - [x] download production versions of html, js, css to debug differences
        - [x] replicate html build
            - use webpack handlebars plugin
        - [x] replicate css build
            - damn this was hard, needed to chain css loader, install another plugin to emit to file, add a line to import the .styl in the js
            - all that, and the missing slider problem is still there
        - [x] replicate js build
            - deleted one of the configs, had to rename the other to get it recognized
    - [x] debug disappearance of slider on local version
        - there was a display: none set on the slider wrapper WHY?
    - [x] debug / find default player behavior
    - [x] change some header text
- [x] Excise gulp from this project, move it all to webpack (gulp doesn't play nice with new versions of npm, too lazy to troubleshoot)
- [x] need to replace the @@include notation for svgs (that was a gulp plugin thing I think)
- [x] make header and menu visible
