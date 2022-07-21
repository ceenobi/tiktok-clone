import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from 'firebase/auth';
import { useParams } from 'react-router-dom';
import { auth } from '../firebase';
import { allPostsQuery, topicPostsQuery } from '../lib/queries';
import { client } from '../lib/client';
import { userQuery } from '../lib/data';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [liked, setLiked] = useState(false);
  const { topicId } = useParams();

  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const forgotPassword = email =>
    sendPasswordResetEmail(auth, email, { url: 'http://localhost:3000/auth' });

  const resetPassword = (oobCode, newPassword) =>
    confirmPasswordReset(auth, oobCode, newPassword);

  const logout = () => {
    signOut(auth);
    localStorage.removeItem('user');
  };

  const userInfo =
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.localId);
    client.fetch(query).then(data => {
      setUser(data[0]);
    });
  }, [userInfo?.localId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUserId(currentUser);
    });
    unsubscribe();
  }, []);

  useEffect(() => {
    if (topicId) {
      setLoading(true);
      const topicQuery = topicPostsQuery(topicId);
      client.fetch(topicQuery).then(data => {
        setFeeds(data);
        setLoading(false);
      });
    } else {
      setLoading(true);
      const query = allPostsQuery();
      client.fetch(query).then(data => {
        setFeeds(data);
        setLoading(false);
      });
    }
  }, [topicId]);

  return (
    <UserContext.Provider
      value={{
        createUser,
        signIn,
        user,
        logout,
        signInWithGoogle,
        showModal,
        setShowModal,
        forgotPassword,
        resetPassword,
        userInfo,
        feeds,
        setFeeds,
        isHover,
        setIsHover,
        playing,
        setPlaying,
        isVideoMuted,
        setIsVideoMuted,
        userId,
        setUserId,
        loading,
        setLoading,
        searchTerm,
        setSearchTerm,
        liked,
        setLiked
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => useContext(UserContext);
