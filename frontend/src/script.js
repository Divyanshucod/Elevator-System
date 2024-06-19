

import { HandleSocket } from './socket.js';

document.addEventListener('DOMContentLoaded', () => {
    const socket = HandleSocket();
    const noOfFloors = 5;
    const mainDiv = document.getElementsByClassName('innerDiv')[0];
    const liftDiv = document.getElementsByClassName('LiftDiv')[0];

    if (mainDiv) {
        for (let i = 0; i < noOfFloors; i++) {
            const floorDiv = document.createElement('div');
            const ButtonDiv = document.createElement('div');
            const firstButton = document.createElement('button');
            const secondButton = document.createElement('button');
            const waitTimeDisplay = document.createElement('p');
            const lift = document.createElement('div');

            firstButton.innerHTML = `&#9650;`; // Up arrow
            secondButton.innerHTML = `&#9660;`; // Down arrow

            lift.classList.add('lift');
            waitTimeDisplay.classList.add('waitTimes');
            firstButton.classList.add('up');
            secondButton.classList.add('down');
            floorDiv.classList.add('floor');
            ButtonDiv.classList.add('buttons');

            ButtonDiv.appendChild(firstButton);
            ButtonDiv.appendChild(secondButton);
            floorDiv.appendChild(ButtonDiv);
            floorDiv.appendChild(waitTimeDisplay);
            mainDiv.appendChild(floorDiv);
            liftDiv.appendChild(lift);
        }

        // Initialize lift at the 0th floor
        document.querySelectorAll('.lift')[noOfFloors - 1].style.backgroundColor = 'blue';
    } else {
        console.error('Element(s) not found: Check innerDiv class or SocketConnection ID in HTML.');
    }

    let previousPos = noOfFloors - 1;
    const allUpButtons = document.querySelectorAll('.up');
    const allDownButtons = document.querySelectorAll('.down');
    const allFloors = document.querySelectorAll('.waitTimes');

    allUpButtons.forEach((Button, index) => {
        Button.addEventListener('click', () => {
            socket.send(JSON.stringify({ type: 'user', algo: 'c_scan', payload: { value: noOfFloors - index - 1 } }));
        });
    });

    allDownButtons.forEach((Button, index) => {
        Button.addEventListener('click', () => {
            socket.send(JSON.stringify({ type: 'user', algo: 'c_scan', payload: { value: noOfFloors - index - 1 } }));
        });
    });

    // Handle incoming socket calls 
    socket.onmessage = (event) => {
        const message = JSON.parse(event.data.toString());
        switch (message.type) {
            case 'user':
                if (message.payload?.currentPos !== undefined) {
                    handleCurrentPos(message.payload.currentPos);
                }
                if (message.payload?.waitTimes) {
                    handleWaitTime(message.payload.waitTimes);
                }
                break;
            case 'admin':
                // Handle admin messages if needed
                break;
        }
    };

    function handleCurrentPos(value) {
        const allLifts = document.querySelectorAll('.lift');
        const allFloorsDivs = document.querySelectorAll('.floor');
        
        // Reset previous floor color
        allFloorsDivs[previousPos].style.backgroundColor = 'transparent';
        allLifts[previousPos].style.backgroundColor = 'transparent';

        // Update current floor and lift color
        allFloorsDivs[noOfFloors - value - 1].style.backgroundColor = 'lightblue';
        allLifts[noOfFloors - value - 1].style.backgroundColor = 'blue';

        previousPos = noOfFloors - value - 1;
    }

    function handleWaitTime(value) {
        if (allFloors) {
            for (let i = 0; i < allFloors.length; i++) {
                allFloors[noOfFloors - i - 1].innerHTML = `${value[i]}`;
            }
        }
    }
});

