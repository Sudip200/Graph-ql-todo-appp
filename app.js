const express=require("express")
const mongoose =require("mongoose")
const {gql}=require('apollo-server-express')
const articleSchema=new mongoose.Schema({
    title:{type:String,require:true},
    text:{type:String,required:true},
    date:{type:Date,required:true}

})
const Page=mongoose.model('Todo',articleSchema);
//connection

//Graphql
const typeDefs=gql`
type Page{
    id:ID!,
    title:String!,
    text:String!,

}
type Query{
    pages:[Pages!]
}
type Mutation{
    addPage(title:String!,text:String!):Page!
    deletePage(id:ID!):Page!
}
`
const resolver={
    Query:{
       pages:() =>Page.find()
    },
    Mutation:{
        addPage:async (_,{title,text})=>{
           const page=new Page({titel,text});
           await page.save()
           return todo
        },
        deleteTodo:async (_,{id})=>{
            const page=await Page.findById(id)
            await todo.remove()
            return todo
        }
    }
}
const server= new ApolloServer({
    typeDefs,
    resolver
});
server.applyMiddleware({app})
app.listen({port:3000},()=>{
    console.log("listention")
})