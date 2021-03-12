import crypto from"crypto";import fs from"fs";import path from"path";
/**
 * @module generate-passphrase
 * @author Reinaldy Rafli <hi@reinaldyrafli.com>
 * @license MIT
 */let randomBytes,randomIndex;function getRandomValue(){return(void 0===randomIndex||randomIndex>=randomBytes.length)&&(randomBytes=crypto.randomBytes(256),randomIndex=0),randomIndex+=1,randomBytes[randomIndex]}function getRandomNumber(e){let t=getRandomValue();for(;void 0===t||t>=256-256%e;)t=getRandomValue();return t%e}function getRandomPattern(t,e){var r=e?"NWW":"WWW";let n="";for(let e=0;e<t;e+=1)n+=r[getRandomNumber(2)];return n}function getRandomWord(){var e=fs.readFileSync(path.resolve(__dirname,"words.txt"),"utf8").split("\n");return e[crypto.randomInt(0,e.length)]}
/**
 * Generate a passphrase with options
 * @param {generateOptions} options - The options
 * @returns {string} - A passphrase
 */function generate(e={}){const t={length:4,separator:"-",numbers:!0,uppercase:!1,titlecase:!1,pattern:null,...e};if(0===t.length)throw new Error("Length should be 1 or bigger. It should not be zero.");const r=[];let n;n=t.pattern?t.pattern.toUpperCase():getRandomPattern(t.length,t.numbers);var o=n.split("");for(let e=0;e<o.length;e+=1)if("N"===o[e])r.push(getRandomValue());else{if("W"!==o[e])throw new Error("Unknown pattern found. Use N or W instead.");{const a=getRandomWord();t.uppercase?r.push(a.toUpperCase()):t.titlecase?r.push(a.replace(/\w\S*/g,e=>e.charAt(0).toUpperCase()+e.substr(1).toLowerCase())):r.push(a)}}return r.join(t.separator)}
/**
 * Generate multiple passphrase with the same options
 * @param {number} amount - The number of passphrase returned
 * @param {generateOptions} options - The options
 * @returns {Array<string>} - Array of passphrases
 */function generateMultiple(t,r={}){const n=[];for(let e=0;e<t;e+=1)n[e]=generate(r);return n}export{generate as generate,generateMultiple as generateMultiple};
