# merchants-guild-api

#Getting
to get the list of all items make a get request to /items

/requests gives you all requests

/users returns all users

#posting
you can post requests and items
requests take in
{
	name:String
	budget:Number
	discription:String
}

Items take in
{
	name:String
	price:Number
	discription:String
}



#Searching
/items/search or /request/search
takes in an array of strings called "tags":[]

That returns all the items that have the tag's 


#Login 
/login takes
{
	name:String
	email:String
	password:String

}




