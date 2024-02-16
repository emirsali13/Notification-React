import React, { useState } from "react";
import "./card.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type: liked ? 0 : 1,
    });
  };

  const handleComment = () => {
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type: 2,
    });
  };

  const handleShare = () => {
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type: 3,
    });
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullName}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <FaHeart className="cardIcon" color="red" onClick={handleLike} />
        ) : (
          <FaRegHeart className="cardIcon" onClick={handleLike} />
        )}
        <FaRegComment className="cardIcon" onClick={handleComment} />
        <CiShare2 className="cardIcon" onClick={handleShare} />
        <IoIosInformationCircleOutline className="cardIcon infoIcon" />
      </div>
    </div>
  );
};

export default Card;
