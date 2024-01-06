export type User = {
  id: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  accounts: Account[];
  sessions: Session[];
  posts: Post[];
  Post: Post[];
  comments: Comment[];
  Comments: Comment[];
  likes: Like[];
  Like: Like[];
  Github: string;
  LinkedIn: string;
  Dribble: string;
};

export type Account = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
};

export type Session = {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;
};

export type Post = {
  id: string;
  createdAt: Date;
  slug: string;
  title: string;
  desc: string;
  img: string;
  views: number;
  tech: string;
  catSlug: string;
  cat: Category;
  userEmail: string;
  user: User;
  comments: Comment[];
  likes: Like[];
  projectLink: string;
  projectCode: string;
};

export type Category = {
  id: string;
  slug: string;
  title: string;
  img: string;
  Posts: Post[];
};

export type Comment = {
  id: string;
  createdAt: Date;
  desc: string;
  userEmail: string;
  user: User;
  postSlug: string;
  post: Post;
};

export type Like = {
  id: string;
  createdAt: Date;
  userEmail: string;
  user: User;
  postSlug: string;
  post: Post;
};

export type searchParams = {
  searchParams: {
    page: string;
  };
};

export type searchCatParams = {
  searchParams: {
    page: string;
    cat: string;
  };
};

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

import type { Server as HTTPServer } from "http";
import type { NextApiResponse } from "next";
import type { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";

export interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export interface ServerToClientEvents {
  userServerConnection: () => void;
  hello: (msg: string) => void;
  userServerDisconnection: (socketid: string) => void;
}

export interface ClientToServerEvents {
  hello: (msg: string) => void;
  userServerConnection: () => void;
  userServerDisconnection: (socketid: string) => void;
}
