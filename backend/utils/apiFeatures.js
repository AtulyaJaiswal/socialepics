class ApiFeatures {
     constructor(query,queryStr){
         this.query = query;
         this.queryStr = queryStr;
     }

     search(){
          //this.queryStr req.query ko access kr raa
          const keyword = this.queryStr.keyword ? {
              name:{
                  $regex: this.queryStr.keyword, //regex=regular expression - mongo db ka keyword hai
                  $options: "i", //it means case insensitive search krega ABC=abc
              },
          } : {};
  
          // console.log(keyword);
  
          this.query = this.query.find({...keyword}); //this.query me product.find() aaya, usi ko improvise kr rhe
                                                      //apne keyword ke liye
          return this; //same class return
      }
}