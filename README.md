

<div align="center">

# p2p-voice-call
</div>

This repository contains the code for a peer-to-peer voice call application, leveraging WebRTC for real-time communication. It includes server-side components using Node.js with Express, and client-side interactions facilitated by socket.io. This project offers a foundation for creating direct audio communication channels between users.

## Features

*   **Peer-to-Peer Audio:** Establishes direct audio connections between users using WebRTC.
*   **Server-Side Logic:** Employs Node.js and Express.js for signaling and routing.
*   **Real-time Communication:** Utilizes socket.io for real-time event handling and signaling.
*   **Modular Structure:** Well-organized codebase, making it easy to understand and extend.

## Table of Contents

*   [Installation](#installation)
*   [Running the Project](#running-the-project)
*   [Dependencies](#dependencies)
*   [Contributing](#contributing)
*   [License](#license)
*   [Contact](#contact)

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/AkashElangovan/p2p-voice-call.git
    cd p2p-voice-call
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

## Running the Project

To run the project, start the server application using:

```bash
npm start
```

This will start the server. Open `public/index.html` in your browser.  For local testing, accessing this file directly will suffice for client-side functionality. For a more involved setup, you may want to host this `index.html` with your express server and access it via `http://localhost:3000`

## Dependencies

*   **bcrypt:** For hashing passwords securely.
*   **express:** A minimal and flexible Node.js web application framework.
*   **socket.io:** Enables real-time bidirectional event-based communication.

## Contributing

We welcome contributions to the project. Please follow these steps to contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear messages.
4.  Test your changes thoroughly.
5.  Submit a pull request.

## License

This project is licensed under the ISC License.

## Contact

For any questions or feedback, please contact:

*   **Maintainer:** Akash Elangovan
*   **Email:** example@email.com
