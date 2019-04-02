const inquirer    = require('inquirer');

module.exports = {
    askKubefyCreateUser: () => {
        const questions = [
            {
                type: 'input',
                name: 'url',
                message: 'Enter Kubefy Service URL:',
                validate: function( value ) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter Kubefy Service URL.';
                    }
                }
            },
            {
                type: 'input',
                name: 'userName',
                message: 'Enter user name to be created:',
                validate: function( value ) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter user name.';
                    }
                }
            },
            
            {
                type: 'input',
                name: 'bucket',
                message: 'Enter the name of RGW bucket to be created:'
            },
            {
                type: 'input',
                name: 'dockerId',
                message: 'Enter docker.io login id:'
            },
            {
                name: 'dockerPassword',
                type: 'password',
                message: 'Enter docker.io password:',
                when: function(answers) {
                    return answers.dockerId;
                },
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter docker.io password.';
                    }
                }
            },
            {
                name: 'githubId',
                type: 'input',
                message: 'Enter your Github username or e-mail address:'
            },
            {
                name: 'githubPassword',
                type: 'password',
                message: 'Enter your Github password:',
                when: function(answers) {
                    return answers.githubId;
                },                
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your password.';
                    }
                }
            }        
        ];
        return inquirer.prompt(questions);
    },

    askKubefyCreateFunction: () => {
        const questions = [
            {
                type: 'input',
                name: 'funcName',
                message: 'Enter function name:',
                validate: function( value ) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter function name.';
                    }
                }
            },
            {
                type: 'input',
                name: 'image',
                message: 'Enter Container Image URL:',
                validate: function( value ) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter function name.';
                    }
                }
            },
            {
                type: 'input',
                name: 'gitRepo',
                message: 'Enter Git Repo URL if exists:'
            },
        ];    
        return inquirer.prompt(questions);
    },

    askKubefyGetFunction: () => {
        const questions = [
            {
                type: 'input',
                name: 'funcName',
                message: 'Enter function name:',
                validate: function( value ) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter function name.';
                    }
                }
            }
        ];    
        return inquirer.prompt(questions);
    }
    
};
