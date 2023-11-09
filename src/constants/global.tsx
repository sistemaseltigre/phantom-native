import {Buffer} from 'buffer';
import base64 from 'react-native-base64';

global.btoa = base64.encode;
global.atob = base64.decode;
global.Buffer = Buffer;
