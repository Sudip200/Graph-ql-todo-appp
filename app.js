const express=require("express")
const mongoose =require("mongoose")
const {gql}=require('apollo-server-express')
const { ApolloServer } = require('apollo-server-express');
const app = express();
const articleSchema=new mongoose.Schema({
    title:{type:String,require:true},
    text:{type:String,required:true},
    date:{type:Date,required:true}

})
const Page=mongoose.model('Page',articleSchema);
mongoose.connect('mongodb+srv://dassudipto200:12345@cluster0.bgz5hvv.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));


//Graphql
const typeDefs=gql`
type Page{
    id:ID!,
    title:String!,
    text:String!,

}
type Query{
    pages:[Page!]!
}
type Mutation{
    addPage(title:String!,text:String!):Page!
    deletePage(id:ID!):Page!
    updatePage(id:ID!):Page!
}
`
const resolvers={
    Query:{
       pages:async () => {
        try {
          const pages = await Page.find({});
          return pages;
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    Mutation:{
        addPage:async (_,{title,text})=>{
           const page=new Page({title,text,date: new Date()
        });
           await page.save()
           return page
        },
        deletePage:async (_,{id})=>{
            const page=await Page.findById(id)
            await todo.remove()
            return page
        },
        updatePage:async (_,{id,title,text})=>{
            const page=await Page.findById(id)
            page.title=title
            page.text=text
            await page.save()
        }
    }
}

async function startApolloServer() {
    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start(); // <== Add this line to start the server
    server.applyMiddleware({ app });
    await new Promise(resolve => app.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  }
startApolloServer()
