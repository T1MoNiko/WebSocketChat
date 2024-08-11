import { create } from "zustand";
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'

export const useAppState = create(
  devtools(
    immer((set) => ({
      createRoomName: '',
      searchRoomName: '',
      currentRoom: '',
      rooms: [],
      users: [],
      messages: [],
      messageText: '',
      isModalActive: false,
      socketId: '',
    

      setCreateRoomName: (roomName) => set((state) => {
        state.createRoomName = roomName;
      }),
      setSearchRoomName: (roomName) => set((state) => {
        state.searchRoomName = roomName;
      }),
      setCurrentRoom: (room) => set((state) => {
        state.currentRoom = room;
      }),
      setUsers: (users) => set((state) => {
        state.users = users;
      }),
      addUser: (user) => set((state) => {
        state.users.push(user);
      }),
      setMessages: (messages) => set((state) => {
        state.messages = messages;
      }),
      addMessage: (message) => set((state) => {
        state.messages.push(message);
      }),
      setMessageText: (text) => set((state) => {
        state.messageText = text;
      }),
      setIsModalActive: (active) => set((state) => {
        state.isModalActive = active;
      }),
      setRooms: (rooms) => set((state) => {state.rooms = rooms}),
      setSocketId: (socketId) => set((state) => {state.socketId = socketId}),
    }))
  )
);
