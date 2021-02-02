const adminController = {};

//MODEL ADMIN
const Page = require("../models/Page");

adminController.index = async (req, res) => {
  try {
    const dataSlug = await Page.find({}).sort({ sorting: 1 }).lean();
    console.log("DATA SLUG DB:", dataSlug);
    let Pagina = 'Paginas';
    const viewModel = {dataSlug , Pagina}
    res.render("admin/page/pages.hbs", viewModel);
  } catch (error) {
    console.error(error);
  }
};

adminController.form = (req, res) => {
  res.render("admin/page/add.hbs", { Pagina: "Form Page" });
};

adminController.formAdd = async (req, res) => {
  try {
    console.log("DATA PAGE : ", req.body);
    let slugfind = req.body.slug;
    let isTrue   = await Page.findOne({ slug: slugfind });
    if (isTrue) {
      req.flash("error", "Ya existe el Slug , Digite otro");
      res.redirect("/admin/page/pages");
    } else {
      const page   = new Page();
      page.title   = req.body.title;
      page.slug    = req.body.title.toLowerCase();
      page.content = req.body.content;
      page.sorting = 0;
      const corret = await page.save();
      if (corret) {
        req.flash("success", "Correcto :)");
        res.redirect("/admin/page/pages");
      } else {
        req.flash("error", "Hubo un error");
        res.redirect("/admin/page/pages/add");
      }
    }
  } catch (error) {
    console.error(error);
  }
};

adminController.reorder = (req, res) => {
  try {
    console.log("IDS TABLE : ", req.body);
    let ids = req.body["id[]"];
    let count = 0;
    for (let indice = 0; indice < ids.lenght; indice++) {
      let id = ids[indice];
      count++;
      (function (count) {
        Page.findById(id, (err, page) => {
          page.sorting = count;
          page.save((err) => {
            if (err) return console.log(err);
          });
        });
      })(count);
    }
  } catch (error) {
    console.error(error);
  }
};

adminController.edit = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("ID EDIT PAGE :", id);
    const dataEdit = await Page.findById({ _id: id }).lean();
    let Pagina = 'Edit Page';
    const viewModel = {dataEdit , Pagina};
    res.render("admin/page/edit.hbs", viewModel);
  } catch (error) {
    console.error(error);
  }
};

adminController.update = async (req, res) => {
  try {
    const id    = req.params.id;
    let title   = req.body.title;
    let slug    = req.body.title.toLowerCase();
    let content = req.body.content;
    const correct = await Page.findByIdAndUpdate(id, {
      title: title,
      slug: slug,
      content: content,
      sorting: 0,
    });
    if (correct) {
      req.flash("success", "Correcto :)");
      res.redirect("/admin/page/pages");
    } else {
      req.flash("error", "Hubo un error en la Actualizacion");
      res.redirect("/admin/page/pages");
    }
  } catch (error) {
    console.error(error);
  }
};

adminController.delete = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("ID DELETE PAGE:", id);
    const drop = await Page.findByIdAndDelete({ _id: id });
    if (drop) {
      req.flash("success", "Correcto Delete :)");
      res.redirect("/admin/page/pages");
    } else {
      req.flash("error", "Hubo un error en la Eiminacion");
      res.redirect("/admin/page/pages");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = adminController;
