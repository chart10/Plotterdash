import React from 'react';
import { BiListUl } from 'react-icons/bi';
import { CgAbstract } from 'react-icons/cg';
import { IoMdStats } from 'react-icons/io';
import { RiUser4Fill } from 'react-icons/ri';
import { GiStack } from 'react-icons/gi';

const links = [
  { text: 'all tasks', path: '.', icon: <BiListUl /> },
  { text: 'add task', path: 'add-task', icon: <CgAbstract /> },
  { text: 'stats', path: 'stats', icon: <IoMdStats /> },
  { text: 'profile', path: 'profile', icon: <RiUser4Fill /> },
  { text: 'admin', path: 'admin', icon: <GiStack /> },
];

export default links;
