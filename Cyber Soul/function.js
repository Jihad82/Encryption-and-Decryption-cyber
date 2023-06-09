
function encrypt() {
	var message = document.getElementById("message").value;
	var key = document.getElementById("key").value;
	var algorithm = document.getElementById("algorithm").value;
	var result = "";
	
	switch(algorithm) {
		case "playfair":
			result = playfairEncrypt(message, key);
			break;
		case "vigenere":
			result = vigenereEncrypt(message, key);
			break;
		case "multiplicative":
			result = multiplicativeEncrypt(message, key);
			break;
		case "railfence":
			result = railfenceEncrypt(message, key);
			break;
		default:
			alert("Invalid algorithm selected");
			return;
	}
	
	document.getElementById("result").value = result;
}

function decrypt() {
	var message = document.getElementById("message").value;
	var key = document.getElementById("key").value;
	var algorithm = document.getElementById("algorithm").value;
	var result = "";
	
	switch(algorithm) {
		case "playfair":
			result = playfairDecrypt(message, key);
			break;
		case "vigenere":
			result = vigenereDecrypt(message, key);
			break;
		case "multiplicative":
			result = multiplicativeDecrypt(message, key);
			break;
		case "railfence":
			result = railfenceDecrypt(message, key);
			break;
		default:
			alert("Invalid algorithm selected");
			return;
	}
	
	document.getElementById("result").value = result;
}

/* Playfair Cipher */

//playfair Encrypt
function playfairEncrypt(message, key) {
  // Prepare the key square
  const keySquare = prepareKeySquare(key);

  // Prepare the message by removing non-alphabetic characters
  const plaintext = preparePlaintext(message);

  // Generate the digraphs
  const digraphs = generateDigraphs(plaintext);

  // Encrypt the digraphs
  let ciphertext = '';
  digraphs.forEach(digraph => {
    const encryptedDigraph = encryptDigraph(digraph, keySquare);
    ciphertext += encryptedDigraph;
  });

  return ciphertext;
}

function prepareKeySquare(key) {
  // Remove duplicate letters from the key
  key = key.replace(/[^a-zA-Z]/g, '').toUpperCase();
  key = removeDuplicates(key);

  // Create the key square
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  let keySquare = key + alphabet;
  keySquare = removeDuplicates(keySquare);

  return keySquare;
}

function preparePlaintext(message) {
  // Remove non-alphabetic characters and convert to uppercase
  return message.replace(/[^a-zA-Z]/g, '').toUpperCase();
}

function generateDigraphs(plaintext) {
  const digraphs = [];
  let i = 0;
  while (i < plaintext.length) {
    let digraph = plaintext[i];
    if (i === plaintext.length - 1 || plaintext[i] === plaintext[i + 1]) {
      digraph += 'X';
      i++;
    } else {
      digraph += plaintext[i + 1];
      i += 2;
    }
    digraphs.push(digraph);
  }
  return digraphs;
}

function encryptDigraph(digraph, keySquare) {
  const row1 = Math.floor(keySquare.indexOf(digraph[0]) / 5);
  const col1 = keySquare.indexOf(digraph[0]) % 5;
  const row2 = Math.floor(keySquare.indexOf(digraph[1]) / 5);
  const col2 = keySquare.indexOf(digraph[1]) % 5;

  let encryptedDigraph = '';

  if (row1 === row2) {
    encryptedDigraph += keySquare[row1 * 5 + (col1 + 1) % 5];
    encryptedDigraph += keySquare[row2 * 5 + (col2 + 1) % 5];
  } else if (col1 === col2) {
    encryptedDigraph += keySquare[((row1 + 1) % 5) * 5 + col1];
    encryptedDigraph += keySquare[((row2 + 1) % 5) * 5 + col2];
  } else {
    encryptedDigraph += keySquare[row1 * 5 + col2];
    encryptedDigraph += keySquare[row2 * 5 + col1];
  }

  return encryptedDigraph;
}

function removeDuplicates(str) {
  return str
    .split('')
    .filter((value, index, self) => self.indexOf(value) === index)
    .join('');
}

	//  Playfair Cipher Decryption
  function playfairDecrypt(message, key) {
    // Prepare the key square
    const keySquare = prepareKeySquare(key);
  
    // Generate the digraphs
    const digraphs = generateDigraphs(message);
  
    // Decrypt the digraphs
    let plaintext = '';
    digraphs.forEach(digraph => {
      const decryptedDigraph = decryptDigraph(digraph, keySquare);
      plaintext += decryptedDigraph;
    });
  
    return plaintext;
  }
  
  // Helper functions
  
  function prepareKeySquare(key) {
    // Remove duplicate letters from the key
    key = key.replace(/[^a-zA-Z]/g, '').toUpperCase();
    key = removeDuplicates(key);
  
    // Create the key square
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
    let keySquare = key + alphabet;
    keySquare = removeDuplicates(keySquare);
  
    return keySquare;
  }
  
  function generateDigraphs(message) {
    // Prepare the message by removing non-alphabetic characters
    message = message.replace(/[^a-zA-Z]/g, '').toUpperCase();
  
    const digraphs = [];
    let i = 0;
    while (i < message.length) {
      let digraph = message[i];
      if (i === message.length - 1 || message[i] === message[i + 1]) {
        digraph += 'X';
        i++;
      } else {
        digraph += message[i + 1];
        i += 2;
      }
      digraphs.push(digraph);
    }
    return digraphs;
  }
  
  function decryptDigraph(digraph, keySquare) {
    const row1 = Math.floor(keySquare.indexOf(digraph[0]) / 5);
    const col1 = keySquare.indexOf(digraph[0]) % 5;
    const row2 = Math.floor(keySquare.indexOf(digraph[1]) / 5);
    const col2 = keySquare.indexOf(digraph[1]) % 5;
  
    let decryptedDigraph = '';
  
    if (row1 === row2) {
      decryptedDigraph += keySquare[row1 * 5 + (col1 + 4) % 5];
      decryptedDigraph += keySquare[row2 * 5 + (col2 + 4) % 5];
    } else if (col1 === col2) {
      decryptedDigraph += keySquare[((row1 + 4) % 5) * 5 + col1];
      decryptedDigraph += keySquare[((row2 + 4) % 5) * 5 + col2];
    } else {
      decryptedDigraph += keySquare[row1 * 5 + col2];
      decryptedDigraph += keySquare[row2 * 5 + col1];
    }
  
    return decryptedDigraph;
  }
  
  function removeDuplicates(text) {
    return text
      .split('')
      .filter((value, index, self) => self.indexOf(value) === index)
      .join('');
  }
  
/* Vigenere Cipher */

function vigenereEncrypt(message, key) {
  // Prepare the key
  key = prepareKey(key, message.length);

  // Encrypt the message
  let encryptedText = '';
  for (let i = 0; i < message.length; i++) {
    const charCode = (message.charCodeAt(i) + key.charCodeAt(i)) % 26 + 65;
    encryptedText += String.fromCharCode(charCode);
  }

  return encryptedText;
}

function vigenereDecrypt(message, key) {
  // Prepare the key
  key = prepareKey(key, message.length);

  // Decrypt the message
  let decryptedText = '';
  for (let i = 0; i < message.length; i++) {
    const charCode = (message.charCodeAt(i) - key.charCodeAt(i) + 26) % 26 + 65;
    decryptedText += String.fromCharCode(charCode);
  }

  return decryptedText;
}

function prepareKey(key, length) {
  // Repeat the key to match the length of the message
  let preparedKey = '';
  const keyLength = key.length;
  let i = 0;
  while (preparedKey.length < length) {
    preparedKey += key.charAt(i);
    i = (i + 1) % keyLength;
  }

  return preparedKey.toUpperCase();
}

/* Multiplicative Cipher */
function multiplicativeEncrypt(message, key) {
  // Convert the key to a number
  key = parseInt(key);

  // Encrypt the message
  let encryptedText = '';
  for (let i = 0; i < message.length; i++) {
    const charCode = (message.charCodeAt(i) - 65) * key % 26 + 65;
    encryptedText += String.fromCharCode(charCode);
  }

  return encryptedText;
}

function multiplicativeDecrypt(message, key) {
  // Convert the key to a number
  key = parseInt(key);

  // Find the modular inverse of the key
  const inverseKey = findInverseKey(key, 26);

  // Decrypt the message
  let decryptedText = '';
  for (let i = 0; i < message.length; i++) {
    const charCode = (message.charCodeAt(i) - 65) * inverseKey % 26 + 65;
    decryptedText += String.fromCharCode(charCode);
  }

  return decryptedText;
}

function findInverseKey(key, modulus) {
  for (let i = 1; i < modulus; i++) {
    if ((key * i) % modulus === 1) {
      return i;
    }
  }
  return -1; // Inverse key not found
}

/* Rail Fence Cipher */

function railfenceEncrypt(message, key) {
  // Prepare the message
  const preparedMessage = prepareMessage(message);

  // Create the rail fence pattern
  const pattern = createPattern(key, preparedMessage.length);

  // Encrypt the message
  let encryptedText = '';
  for (let i = 0; i < pattern.length; i++) {
    const row = pattern[i];
    for (let j = 0; j < preparedMessage.length; j++) {
      if (row[j]) {
        encryptedText += preparedMessage[j];
      }
    }
  }

  return encryptedText;
}

function railfenceDecrypt(message, key) {
  // Prepare the message
  const preparedMessage = prepareMessage(message);

  // Create the rail fence pattern
  const pattern = createPattern(key, preparedMessage.length);

  // Decrypt the message
  let decryptedText = '';
  let index = 0;
  for (let i = 0; i < pattern.length; i++) {
    const row = pattern[i];
    for (let j = 0; j < preparedMessage.length; j++) {
      if (row[j]) {
        decryptedText += preparedMessage[index++];
      }
    }
  }

  return decryptedText;
}

function prepareMessage(message) {
  // Remove whitespace and convert to uppercase
  return message.replace(/\s/g, '').toUpperCase();
}

function createPattern(key, length) {
  // Create the rail fence pattern
  const pattern = [];
  let row = 0;
  let direction = 1;

  for (let i = 0; i < length; i++) {
    if (!pattern[row]) {
      pattern[row] = [];
    }
    pattern[row][i] = true;

    if (row === 0) {
      direction = 1;
    } else if (row === key - 1) {
      direction = -1;
    }

    row += direction;
  }

  return pattern;
}
