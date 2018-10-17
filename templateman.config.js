module.exports = {
  templates: [
    {
      name: 'React Function',
      files: [
        {
          from: './templates/react-func.js.tm',
          to: './components/${TM:COMPONENT_NAME}/index.js',
        },
        {
          from: './templates/stylus-file.styl.tm',
          to: './components/${TM:COMPONENT_NAME}/style.styl',
        },
      ],
    },
    {
      name: 'React Class',
      files: [
        {
          from: './templates/react-class.js.tm',
          to: './components/${TM:COMPONENT_NAME}/index.js',
        },
        {
          from: './templates/stylus-file.styl.tm',
          to: './components/${TM:COMPONENT_NAME}/style.styl',
        },
      ],
    },
    {
      name: 'React Connected Class',
      files: [
        {
          from: './templates/react-connected-class.js.tm',
          to: './components/${TM:COMPONENT_NAME}/index.js',
        },
        {
          from: './templates/stylus-file.styl.tm',
          to: './components/${TM:COMPONENT_NAME}/style.styl',
        },
      ],
    },
    {
      name: 'React Page',
      files: [
        {
          from: './templates/react-page.js.tm',
          to: './pages/${TM:COMPONENT_NAME}/index.js',
        },
      ],
    },
    {
      name: 'Redux Module',
      files: [
        {
          from: './templates/redux-types.js.tm',
          to: './state/${TM:MODULE_NAME}/types.js',
        },
        {
          from: './templates/redux-actions.js.tm',
          to: './state/${TM:MODULE_NAME}/actions.js',
        },
        {
          from: './templates/redux-reducer.js.tm',
          to: './state/${TM:MODULE_NAME}/index.js',
        },
      ],
    },
    {
      name: 'React Function (separate)',
      files: {
        from: './templates/react-func.js.tm',
        to: './components/${TM:PARENT_COMPONENT_NAME}/${TM:COMPONENT_NAME}.js',
      },
    },
    {
      name: 'React Class (separate)',
      files: {
        from: './templates/react-class.js.tm',
        to: './components/${TM:PARENT_COMPONENT_NAME}/${TM:COMPONENT_NAME}.js',
      },
    },
    {
      name: 'React Connected class (separate)',
      files: {
        from: './templates/react-connected-class.js.tm',
        to: './components/${TM:PARENT_COMPONENT_NAME}/${TM:COMPONENT_NAME}.js',
      },
    },
  ],
};
