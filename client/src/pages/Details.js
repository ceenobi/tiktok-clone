import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  HStack,
  Icon,
  Avatar,
  Heading,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { GoVerified } from 'react-icons/go';
import { useParams, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineLike, AiTwotoneDelete } from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';

import { UserAuth } from '../context/AuthContext';
import { client } from '../lib/client';
import { postDetailQuery } from '../lib/queries';
import Loader from '../utils/Loader';

export default function Details() {
  const [postDetail, setPostDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { detailId } = useParams();
  const { user, liked, setLiked } = UserAuth();

  const fetchPostDetails = () => {
    const query = postDetailQuery(detailId);
    if (query) {
      client.fetch(`${query}`).then(data => {
        setPostDetail(data[0]);
      });
    }
  };

  const deletePin = () => {
    client.delete(postDetail._id).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    fetchPostDetails();
  }, [detailId]);

  const addComment = () => {
    if (comment) {
      setIsSubmitting(true);
      setAddingComment(true);
      client
        .patch(detailId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: 'postedBy', _ref: user?._id },
          },
        ])
        .commit()
        .then(() => {
          fetchPostDetails();
          setComment('');
          window.location.reload();
          setAddingComment(false);
        });
      setIsSubmitting(false);
    }
  };

  // let alreadyLiked = postDetail?.likes?.filter(
  //   item => item?._ref === user?._id
  // );
  //alreadyLiked = alreadyLiked?.length > 0 ? alreadyLiked : [];

  const addLike = async () => {
    setLiked(true);
    await client
      .patch(detailId)
      .setIfMissing({ likes: [] })
      .insert('after', 'likes[-1]', [
        {
          _key: uuidv4(),
          _ref: user?._id,
        },
      ])
      .commit();
  };

  const removelike = async () => {
    setLiked(false);
    await client
      .patch(detailId)
      .unset([`likes[_ref=="${user?._id}"]`])
      .commit();
  };

  if (!postDetail) {
    return <Loader />;
  }

  return (
    <>
      {postDetail && (
        <Box py={3} ml={{ base: 'none', md: 20 }}>
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            gap={6}
            ml={{ base: null, lg: '10' }}
          >
            <Box minW="280px" mb={6}>
              <Box
                as="video"
                src={postDetail.video.asset.url}
                type="video/mp4"
                loop
                controls
                w="full"
                h="500px"
                objectFit="contain"
                borderRadius="lg"
                mb={4}
                sx={{
                  aspectRatio: '9/16',
                }}
              />
              <Flex justify="space-between" align="center">
                {liked ? (
                  <Flex gap={4}>
                    <Text>Liked:</Text>
                    <Icon
                      as={FcLike}
                      boxSize="20px"
                      m="auto"
                      onClick={removelike}
                      cursor="pointer"
                    />
                  </Flex>
                ) : (
                  <Flex gap={2}>
                    <Text>Like</Text>
                    <Icon
                      as={AiOutlineLike}
                      boxSize="20px"
                      m="auto"
                      onClick={addLike}
                      cursor="pointer"
                    />
                  </Flex>
                )}
                <>
                  {user?._id === postDetail.postedBy?._id && (
                    <Flex gap={2}>
                      <Text>Delete</Text>
                      <Icon
                        as={AiTwotoneDelete}
                        boxSize="20px"
                        onClick={deletePin}
                        cursor="pointer"
                      />
                    </Flex>
                  )}
                </>
              </Flex>
            </Box>
            <Box>
              <HStack spacing={3} mb={4}>
                <Avatar
                  as={Link}
                  to={`/profile/${postDetail.postedBy?._id}`}
                  src={postDetail?.postedBy.image}
                  size="md"
                  name={postDetail.postedBy.userName}
                />
                <Box textAlign="left" fontWeight="bold">
                  <Box>
                    <HStack spacing="4px">
                      <Text
                        as={Link}
                        to={`/profile/${postDetail.postedBy?._id}`}
                      >
                        {postDetail?.postedBy.userName}
                      </Text>
                      <Icon as={GoVerified} color="paint.teal" />
                    </HStack>
                    <Text textStyle="p">#{postDetail?.topic}</Text>
                  </Box>
                  <Box mb={2}>
                    <Text textStyle="p">{postDetail.caption}</Text>
                  </Box>
                </Box>
              </HStack>
            </Box>
          </Flex>
          <Box mt={6} ml={6}>
            <Heading as="h2" fontSize="lg" mb={6}>
              Comments
            </Heading>
            {postDetail?.comments?.map(item => (
              <HStack spacing="10px" key={item.comment} mb={3}>
                <Avatar
                  src={item?.postedBy?.image}
                  size="sm"
                  name={item.postedBy?.userName}
                />
                <Box>
                  <Text>{item.postedBy?.userName}</Text>
                  <Text>{item.comment}</Text>
                </Box>
              </HStack>
            ))}
          </Box>
          <HStack spacing={4} mt={4}>
            <Avatar
              as={Link}
              to={`/profile/${postDetail.postedBy?._id}`}
              src={postDetail?.postedBy.image}
              size="sm"
              name={postDetail.postedBy.userName}
            />
            <Textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Add a comment"
              size="md"
            />
            <Button
              bg="paint.teal"
              onClick={addComment}
              isLoading={isSubmitting}
            >
              {' '}
              {addingComment ? 'Posting..' : 'Post'}
            </Button>
          </HStack>
        </Box>
      )}
    </>
  );
}
