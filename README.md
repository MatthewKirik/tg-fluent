# tg-fluent - An unofficial open source node-js library for Telegram Bot API
This library aims on managing telegram-bot's chats by tracking and saving info about their messages.

## structure
* api - Raw bindings for the Telegram Bot API with additional calls to a ChatsManager if provided.
* chats - The adapter that consumes object implementing the interface for storing persistent data about chats.
* components - A set of default base chat components. Fell free to create your own components when using the library.

The project was made as a final work for the course of Software Engeneering by Matthew Kirik and Danil Tarasenko (IP-03 group).
