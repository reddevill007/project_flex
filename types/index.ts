export type User = {
  id: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  accounts: Account[];
  sessions: Session[];
  posts: Post[];
  comments: Comment[];
  likes: Like[];
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
  comments: Comments[];
  likes: Like[];
};

export type Category = {
  id: string;
  slug: string;
  title: string;
  img: string;
  Posts: Post[];
};

export type Comments = {
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
