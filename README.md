# face-your-pace-frontend



실행 UI 화면은 Screens 폴더에 있습니다.


# 설치 방법

## 1. 선행조건

https://dev-yakuza.posstree.com/ko/react-native/install-on-windows/ - 윈도우 버전

https://dev-yakuza.posstree.com/ko/react-native/install-on-mac/ - 맥 버전


위 링크를 참고해서 react-native 어플리케이션 실행을 위한 모든 
세팅을 진행해야 합니다.

## 2. 자신의 가상환경에 진입해서 Git repo를 clone 한다

git clone https://github.com/2022-1-Capstone-Project/face-your-pace-frontend.git .

## 3. frontend 디렉토리에 가서 리액트 패키지를 설치한다

cd face-your-pace-frontend
npm install

## 4. ios인 경우

ios 폴더에 가서

pod install

명령을 수행합니다.

## 5. 어플리케이션을 실행합니다.

npm run android 혹은
npm run ios
## 주의사항
1. 현재 ios 버전은 테스트가 이루어지지 않았기 때문에 npm run ios 실행 시 에러가 발생할 수 있습니다.
2. 디렉토리 내에 폴더명의 한글 문자가 포함되어 있을 시 어플리케이션을 실행하려고 할 때 에러가 발생할 수 있습니다.
3. 로컬에서 백엔드 서버를 돌리면서 테스트를 수행할 시, 백단 서버에 연결되지 않는 connection error가 발생할 수 있습니다.

   이 때는 adb -s '에뮬레이터 이름' reverse tcp:포트번호 tcp:포트번호 를 수행하면 됩니다. 에뮬레이터 이름은 
   가상 에뮬레이터의 이름을 의미하며 포트번호는 로컬에서 실행하는 백엔드 서버의 포트 번호를 의미합니다.
