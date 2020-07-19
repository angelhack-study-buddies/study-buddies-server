import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User as UserModel } from '../models/User';
import { HashTag as HashTagModel } from '../models/HashTag';
import { Post as PostModel } from '../models/Post';
import { LikePost as LikePostModel } from '../models/LikePost';
import { Follow as FollowModel } from '../models/Follow';
import { PostHashTagConnection as PostHashTagConnectionModel } from '../models/PostHashTagConnection';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};

export type HashTag = {
  __typename?: 'HashTag';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  hashTag?: Maybe<HashTag>;
  helloWorld: Scalars['String'];
  post?: Maybe<Post>;
  postGetMany?: Maybe<PostGetManyPayload>;
  postGetManyByGroup?: Maybe<PostGetManyByGroupPayload>;
  user?: Maybe<User>;
};


export type QueryHashTagArgs = {
  id: Scalars['ID'];
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostGetManyArgs = {
  input: PostGetManyInput;
};


export type QueryPostGetManyByGroupArgs = {
  input: PostGetManyByGroupInput;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  follow?: Maybe<Scalars['Boolean']>;
  hashTagCreate?: Maybe<HashTagCreatePayload>;
  likePost?: Maybe<Scalars['Boolean']>;
  postCreate?: Maybe<PostCreatePayload>;
  postDelete: Scalars['Boolean'];
  postUpdate?: Maybe<PostUpdatePayload>;
};


export type MutationFollowArgs = {
  followingID: Scalars['ID'];
};


export type MutationHashTagCreateArgs = {
  input: HashTagCreateInput;
};


export type MutationLikePostArgs = {
  postID: Scalars['ID'];
};


export type MutationPostCreateArgs = {
  input: PostCreateInput;
};


export type MutationPostDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationPostUpdateArgs = {
  input: PostUpdateInput;
};

export type HashTagCreateInput = {
  name: Scalars['String'];
  postID: Scalars['ID'];
};

export type HashTagCreatePayload = {
  __typename?: 'HashTagCreatePayload';
  hashTag?: Maybe<HashTag>;
};

export type LikePost = {
  __typename?: 'LikePost';
  id: Scalars['ID'];
  user: User;
  post: Post;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  author?: Maybe<User>;
  url?: Maybe<Scalars['String']>;
  isLiked?: Maybe<Scalars['Boolean']>;
  likeCount?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  previewImage?: Maybe<Scalars['String']>;
  hashTags?: Maybe<Array<Maybe<HashTag>>>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type PostCreateInput = {
  authorID: Scalars['String'];
  url: Scalars['String'];
  hashTags?: Maybe<Array<Scalars['String']>>;
};

export type PostUpdateInput = {
  id: Scalars['ID'];
  url?: Maybe<Scalars['String']>;
  hashTags?: Maybe<Array<Scalars['String']>>;
  likeCount?: Maybe<Scalars['Int']>;
};

export type PostFilter = {
  hashTags?: Maybe<Array<Scalars['String']>>;
  authorIDs?: Maybe<Array<Scalars['ID']>>;
};

export enum PostOrderField {
  LikeCount = 'LIKE_COUNT',
  CreatedAt = 'CREATED_AT'
}

export type PostOrder = {
  field?: Maybe<PostOrderField>;
  direction?: Maybe<OrderDirection>;
};

export enum PostGroup {
  Author = 'AUTHOR',
  Hashtag = 'HASHTAG'
}

export type PostGetManyInput = {
  filterBy?: Maybe<PostFilter>;
  orderBy?: Maybe<PostOrder>;
  pagination?: Maybe<Pagination>;
};

export type PostGetManyPayload = {
  __typename?: 'PostGetManyPayload';
  posts: Array<Post>;
};

export type PostGetManyByGroupInput = {
  groupBy?: Maybe<PostGroup>;
  limit?: Maybe<Scalars['Int']>;
};

export type PostCollection = {
  __typename?: 'PostCollection';
  key?: Maybe<Scalars['String']>;
  posts: Array<Post>;
};

export type PostGetManyByGroupPayload = {
  __typename?: 'PostGetManyByGroupPayload';
  postCollections?: Maybe<Array<PostCollection>>;
};

export type PostCreatePayload = {
  __typename?: 'PostCreatePayload';
  post?: Maybe<Post>;
};

export type PostUpdatePayload = {
  __typename?: 'PostUpdatePayload';
  post?: Maybe<Post>;
};


export enum OrderDirection {
  Desc = 'DESC',
  Asc = 'ASC'
}

export type Pagination = {
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  profileURL?: Maybe<Scalars['String']>;
  consecutiveStudyDays: Array<Scalars['Date']>;
  posts: Array<Post>;
  recommendations: Array<Post>;
  followers: Array<User>;
  followings: Array<User>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  deletedAt?: Maybe<Scalars['Date']>;
};


export type UserPostsArgs = {
  orderBy?: Maybe<PostOrder>;
  limit?: Maybe<Scalars['Int']>;
};


export type UserRecommendationsArgs = {
  limit?: Maybe<Scalars['Int']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  HashTag: ResolverTypeWrapper<HashTagModel>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  HashTagCreateInput: HashTagCreateInput;
  HashTagCreatePayload: ResolverTypeWrapper<Omit<HashTagCreatePayload, 'hashTag'> & { hashTag?: Maybe<ResolversTypes['HashTag']> }>;
  LikePost: ResolverTypeWrapper<LikePostModel>;
  Post: ResolverTypeWrapper<PostModel>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  PostCreateInput: PostCreateInput;
  PostUpdateInput: PostUpdateInput;
  PostFilter: PostFilter;
  PostOrderField: PostOrderField;
  PostOrder: PostOrder;
  PostGroup: PostGroup;
  PostGetManyInput: PostGetManyInput;
  PostGetManyPayload: ResolverTypeWrapper<Omit<PostGetManyPayload, 'posts'> & { posts: Array<ResolversTypes['Post']> }>;
  PostGetManyByGroupInput: PostGetManyByGroupInput;
  PostCollection: ResolverTypeWrapper<Omit<PostCollection, 'posts'> & { posts: Array<ResolversTypes['Post']> }>;
  PostGetManyByGroupPayload: ResolverTypeWrapper<Omit<PostGetManyByGroupPayload, 'postCollections'> & { postCollections?: Maybe<Array<ResolversTypes['PostCollection']>> }>;
  PostCreatePayload: ResolverTypeWrapper<Omit<PostCreatePayload, 'post'> & { post?: Maybe<ResolversTypes['Post']> }>;
  PostUpdatePayload: ResolverTypeWrapper<Omit<PostUpdatePayload, 'post'> & { post?: Maybe<ResolversTypes['Post']> }>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  OrderDirection: OrderDirection;
  Pagination: Pagination;
  User: ResolverTypeWrapper<UserModel>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  HashTag: HashTagModel;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Query: {};
  Mutation: {};
  Boolean: Scalars['Boolean'];
  HashTagCreateInput: HashTagCreateInput;
  HashTagCreatePayload: Omit<HashTagCreatePayload, 'hashTag'> & { hashTag?: Maybe<ResolversParentTypes['HashTag']> };
  LikePost: LikePostModel;
  Post: PostModel;
  Int: Scalars['Int'];
  PostCreateInput: PostCreateInput;
  PostUpdateInput: PostUpdateInput;
  PostFilter: PostFilter;
  PostOrder: PostOrder;
  PostGetManyInput: PostGetManyInput;
  PostGetManyPayload: Omit<PostGetManyPayload, 'posts'> & { posts: Array<ResolversParentTypes['Post']> };
  PostGetManyByGroupInput: PostGetManyByGroupInput;
  PostCollection: Omit<PostCollection, 'posts'> & { posts: Array<ResolversParentTypes['Post']> };
  PostGetManyByGroupPayload: Omit<PostGetManyByGroupPayload, 'postCollections'> & { postCollections?: Maybe<Array<ResolversParentTypes['PostCollection']>> };
  PostCreatePayload: Omit<PostCreatePayload, 'post'> & { post?: Maybe<ResolversParentTypes['Post']> };
  PostUpdatePayload: Omit<PostUpdatePayload, 'post'> & { post?: Maybe<ResolversParentTypes['Post']> };
  Date: Scalars['Date'];
  Pagination: Pagination;
  User: UserModel;
}>;

export type HashTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['HashTag'] = ResolversParentTypes['HashTag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  hashTag?: Resolver<Maybe<ResolversTypes['HashTag']>, ParentType, ContextType, RequireFields<QueryHashTagArgs, 'id'>>;
  helloWorld?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  postGetMany?: Resolver<Maybe<ResolversTypes['PostGetManyPayload']>, ParentType, ContextType, RequireFields<QueryPostGetManyArgs, 'input'>>;
  postGetManyByGroup?: Resolver<Maybe<ResolversTypes['PostGetManyByGroupPayload']>, ParentType, ContextType, RequireFields<QueryPostGetManyByGroupArgs, 'input'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  follow?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationFollowArgs, 'followingID'>>;
  hashTagCreate?: Resolver<Maybe<ResolversTypes['HashTagCreatePayload']>, ParentType, ContextType, RequireFields<MutationHashTagCreateArgs, 'input'>>;
  likePost?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationLikePostArgs, 'postID'>>;
  postCreate?: Resolver<Maybe<ResolversTypes['PostCreatePayload']>, ParentType, ContextType, RequireFields<MutationPostCreateArgs, 'input'>>;
  postDelete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationPostDeleteArgs, 'id'>>;
  postUpdate?: Resolver<Maybe<ResolversTypes['PostUpdatePayload']>, ParentType, ContextType, RequireFields<MutationPostUpdateArgs, 'input'>>;
}>;

export type HashTagCreatePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['HashTagCreatePayload'] = ResolversParentTypes['HashTagCreatePayload']> = ResolversObject<{
  hashTag?: Resolver<Maybe<ResolversTypes['HashTag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type LikePostResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikePost'] = ResolversParentTypes['LikePost']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isLiked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  likeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  previewImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hashTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['HashTag']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type PostGetManyPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostGetManyPayload'] = ResolversParentTypes['PostGetManyPayload']> = ResolversObject<{
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type PostCollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostCollection'] = ResolversParentTypes['PostCollection']> = ResolversObject<{
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type PostGetManyByGroupPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostGetManyByGroupPayload'] = ResolversParentTypes['PostGetManyByGroupPayload']> = ResolversObject<{
  postCollections?: Resolver<Maybe<Array<ResolversTypes['PostCollection']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type PostCreatePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostCreatePayload'] = ResolversParentTypes['PostCreatePayload']> = ResolversObject<{
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type PostUpdatePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostUpdatePayload'] = ResolversParentTypes['PostUpdatePayload']> = ResolversObject<{
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profileURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  consecutiveStudyDays?: Resolver<Array<ResolversTypes['Date']>, ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<UserPostsArgs, never>>;
  recommendations?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<UserRecommendationsArgs, never>>;
  followers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  followings?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  HashTag?: HashTagResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  HashTagCreatePayload?: HashTagCreatePayloadResolvers<ContextType>;
  LikePost?: LikePostResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostGetManyPayload?: PostGetManyPayloadResolvers<ContextType>;
  PostCollection?: PostCollectionResolvers<ContextType>;
  PostGetManyByGroupPayload?: PostGetManyByGroupPayloadResolvers<ContextType>;
  PostCreatePayload?: PostCreatePayloadResolvers<ContextType>;
  PostUpdatePayload?: PostUpdatePayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
