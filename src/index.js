import { add, hello } from './util';
import './style.css';

const text = hello('원진gagasg');
const num = add(1, 2);

document.getElementById('root').innerHTML = text + num;