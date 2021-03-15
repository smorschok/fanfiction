const { Router } = require("express");
const auth = require("../middleware/auth.middleware");
const router = Router();
const Fanfic = require("../models/Fanfic");
const Tag = require("../models/Tags");
const cloudinary = require("cloudinary").v2;
router.get("/", auth, async (req, res) => {
  try {
    const fanfics = await Fanfic.find({ owner: req.user.userId }).sort({
      order: 1,
    });
    res.json(fanfics);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.post("/comment/:id", auth, async (req, res) => {
  try {
    const { name, comment } = req.body;
    const comments = await Fanfic.findById(req.params.id);
    await comments.updateOne({
      $push: { comments: { name: name, text: comment } },
    });
    res.status(201).json({ message: "Сообщение отправлено" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/tag", auth, async (req, res) => {
  try {
    const tagList = await Tag.findOne();
    res.json(tagList);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.post("/newFanfic", auth, async (req, res) => {
  try {
    const { title, description, genre, tag, name, text, image } = req.body;
    let NewImage = "";
    cloudinary.config({
      cloud_name: "dkqgboopg",
      api_key: "177597782667784",
      api_secret: "_qBbSyMNBpFcJkqIW563Ftv79VY",
    });
    if (image) {
      const addImage = await cloudinary.uploader.upload(
        image.data_url,
        function (error, result) {
          if (result) {
            NewImage = `${result.public_id}.${result.format}`;
          }
        }
      );
    }

    const tagList = await Tag.findOne();
    tag.map(async (e) => {
      if (!tagList.tags.includes(e.tag)) {
        await tagList.update({ $push: { tags: e.tag } });
      }
    });
    const quantity = await Fanfic.countDocuments();

    const fanfic = new Fanfic({
      title: title,
      description: description,
      genre: genre,
      tag: tag,
      chapters: { name: name, text: text, image: NewImage },
      owner: req.user.userId,
      order: quantity + 1,
    });
    await fanfic.save();
    res.status(201).json({ message: "Фанфик создан" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.post("/addChapter/:id", auth, async (req, res) => {
  try {
    const { name, text } = req.body;
    const access = await Fanfic.findById(req.params.id);
    if (access.owner != req.user.userId) {
      return res
        .status(500)
        .json({ message: "У вас нет доступа к данному фанфику" });
    }

    const chapter = await Fanfic.updateOne(
      { _id: req.params.id },
      { $push: { chapters: { name: name, text: text } } }
    );
    res.status(201).json({ message: "Глава добавлена" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.post("/updateOrder", auth, async (req, res) => {
  const order = req.body;

  try {
    order[0].map(async (e, index) => {
      await Fanfic.findByIdAndUpdate(e, { order: index });
    });

    res.status(201).json({ message: "Изменено!" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.post("/delete/:id", auth, async (req, res) => {
  try {
    await Fanfic.findById(req.params.id).remove();

    res.status(201).json({ message: "Фанфик удален" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/chapter/:id",auth,async(req,res)=>{

  const fanfic = await Fanfic.findOne({chapters:{$elemMatch:{_id:req.params.id}}},{chapters:{$elemMatch:{_id:req.params.id}}})
  res.json(fanfic)

})
router.post("/chapterChange/:id",auth,async(req,res)=>{

  try {
    const {name,text} = req.body
  const fanfic = await Fanfic.findOne({chapters:{$elemMatch:{_id:req.params.id}}})

  fanfic.chapters.map(async e=>{
    if(e._id==req.params.id){
     e.name = name
      e.text = text 
      await fanfic.save()
    }
  })
res.status(201).json({ message: "Глава изменена" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });

  }
  



})

module.exports = router;
