using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NodeAPIService.MVC.Controllers
{
    public class FilmeController : Controller
    {
        // GET: Filme
        public ActionResult Index()
        {
            return View();
        }
    }
}