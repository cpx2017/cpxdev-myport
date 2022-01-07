require("babel-register")({
    presets: ["es2015", "react"]
  });
   
  const router = require("./RouterList").default;
  const Sitemap = require("react-router-sitemap").default;
  
  function generateSitemap() {
      return (
        new Sitemap(router)
            .build("https://myportofficial.chinnathornp.ga")
            .save("./public/sitemap.xml")
      );
  }
  
  generateSitemap();