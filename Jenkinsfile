pipeline {
    agent { 
        label 'OCI-agent' 
    }
    
    environment {
        // vMM.mm.pp-rc.NN
        TAG_PATTERN_TEST = '^v\\d{1,2}?\\.\\d{1,2}?\\.\\d{1,2}?-rc\\.\\d{1,2}?\$'
        // vMM.mm.pp
        TAG_PATTERN_PROD = 'v\\d{1,2}?\\.\\d{1,2}?\\.\\d{1,2}?\$'
    }    
    
    stages {
        stage('Prepare') {
            steps {
                sh '''
                    # Node Version Manager with Jenkins
                    # http://yura.stryi.com/en/2018-04-26/NVM-with-Jenkins/
                    set +ex                     # immediate script fail off, echo off
                    export NVM_DIR="$HOME/.nvm" # set local path to NVM
                    . ~/.nvm/nvm.sh             # add NVM into the Shell session
                    nvm use v8.16.0             # choose current version
                    set -ex                     # immediate script fail on (default), echo on (default)
                     
                    node -v
                    npm install
                    
                    gulp -v
                    gulp install
                '''
            }
        }
        stage('SonarQube') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """/opt/sonar/bin/sonar-scanner \
                            -Dsonar.projectName=INITIUM \
                            -Dsonar.projectKey=INITIUM \
                            -Dsonar.sources=. \
                            -Dsonar.exclusions=node_modules/**,dist/**,build/assets/js/vendors/**"""
                }
            }
        }        
        stage('Publish') {
            when { tag pattern: "${env.TAG_PATTERN_PROD}", comparator: "REGEXP" }
            steps {
                sh '''
                    # Node Version Manager with Jenkins
                    # http://yura.stryi.com/en/2018-04-26/NVM-with-Jenkins/
                    set +ex                     # immediate script fail off, echo off
                    export NVM_DIR="$HOME/.nvm" # set local path to NVM
                    . ~/.nvm/nvm.sh             # add NVM into the Shell session
                    nvm use v8.16.0             # choose current version
                    set -ex                     # immediate script fail on (default), echo on (default)
                    
                    npm publish
                '''
            }
        }
    }    
}
