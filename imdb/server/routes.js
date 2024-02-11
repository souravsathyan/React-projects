const router = require("express").Router()
const Movie = require("./models/models")
const movies = require("./config/moveis.json")

const userList = [
    { id: 1, name: "John" },
    { id: 2, name: "Emma" },
    { id: 3, name: "Michael" }, 
    { id: 4, name: "Sophia" }, 
    { id: 5, name: "William" }, 
    { id: 6, name: "Olivia" }, 
    { id: 7, name: "James" }, 
    { id: 8, name: "Ava" }, 
    { id: 9, name: "Alexander" }, 
    { id: 10, name: "Isabella" }, 
    { id: 11, name: "Benjamin" }, 
    { id: 12, name: "Mia" }, 
    { id: 13, name: "Ethan" }, 
    { id: 14, name: "Charlotte" }
];


router.route('/all').get(async(req, res) => {
    try {
        const page = parseInt(req.query.page)-1 || 0
        const limit = parseInt(req.query.limit) || 5
        const search = req.query.search || ""
        let sort = req.query.sort || "rating"
        let genre = req.query.genre || "All"

        const genreOptions = [
            "Action",
            "Romance",
            "Fantasy",
            "Drama",
            "Crime",
            "Adventure",
            "Thriller",
            "Sci-fi",
            "Music",
            "Family"
        ]

        genre=="All" ? 
        (genre =[...genreOptions]) :
        (genre = req.query.genre.split(","));

        req.query.sort ? 
        (sort = req.query.sort.split(',')) :
        (sort = [sort])

        let sortBy = {}
        if(sort[1]){
            sortBy[sort[0]] = sort[1]
        }else{
            sortBy[sort[0]] = "asc"
        }

        const movies = await Movie.find({name:{$regex:search,$options:"i"}})
        .where("genre")
        .in([...genre])
        .sort(sortBy)
        .skip(page*limit)
        .limit(limit)

        const total = await Movie.countDocuments({
            genre:{$in:[...genre]},
            name:{$regex:search,$options:"i"}
        })

        const response = {
            error:false,
            total,
            page:page+1,
            limit,
            genres:genreOptions,
            movies
        }
        
        console.log(page,limit,search,sort)
        res.status(200).json({ sucess: "success",response })
    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                error:true,
                message:error.message
            }
        )
    }
})


module.exports = router