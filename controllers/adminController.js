const express = require('express');
const mongoose = require('mongoose');
var fs = require('fs');

var router = express.Router();

// mongo_models
const Offers = mongoose.model('Offer');
const Pages = mongoose.model('Page');
// end_of_mongo_models

////////////////
// GET_ROUTES //
////////////////

// route for main admin page
router.get('/', (req,res) => {
    res.redirect('/admin/offers/list');
});

// OFFERS_SECTION //

// list of offers
router.get('/offers/list', (req,res) => {
    Offers.find((err, docs) => {
        res.render("admin/offers_list", {
            layout: 'admin/mainLayout',
            viewTitle: "Offers list",
            list:docs
        });
    });
});

// create offer
router.get('/offers/create',(req, res) => {
    res.render("admin/offers_add_edit", {
        layout: 'admin/mainLayout',
        viewTitle: "Create offer"
    });
});

// edit offer
router.get('/offers/edit/:id', (req, res) => {
    Offers.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("admin/offers_add_edit", {
                layout: 'admin/mainLayout',
                viewTitle: doc.name,
                offer: doc
            });
        }
    });
});

// END_OF_OFFERS_SECTION //

// PAGES_SECTION //

// list of pages (on specific offer)
router.get('/offers/:offer_id/pages/', async (req,res) => {
    const dbOffer = await Offers.findOne({_id: req.params.offer_id}).exec();

    if(dbOffer.platform == 'clickbank') {
        Pages.find({offer_id: req.params.offer_id}, (err, docs) => {
            res.render("admin/pages_list_clickbank", {
                layout: 'admin/mainLayout',
                viewTitle: "Pages list",
                list:docs,
                dbOffer:dbOffer
            });
        });
    }
});

// create clickbank front sell pages (to specific offer)
router.get('/offers/:offer_id/pages/create-front',async (req, res) => {
    const dbOffer = await Offers.findOne({_id: req.params.offer_id}).exec();

    res.render("admin/pages_add_edit_cb", {
        layout: 'admin/mainLayout',
        viewTitle: "Create FrontSell page",
        dbOffer: dbOffer
    });
});

// edit clickbank front sell pages (to specific offer)
router.get('/offers/:offer_id/pages/:page_id/edit', async(req, res) => {
    const dbOffer = await Offers.findOne({_id: req.params.offer_id}).exec();

    Pages.findById(req.params.page_id, (err, doc) => {
        if (!err) {
            res.render("admin/pages_add_edit_cb", {
                layout: 'admin/mainLayout',
                viewTitle: doc.name,
                page: doc,
                dbOffer: dbOffer
            });
        }
    });
});

// END_OF_PAGES_SECTION

///////////////////////
// END_OF_GET_ROUTES //
///////////////////////

/////////////////
// POST_ROUTES //
/////////////////

// OFFERS_SECTION //

// post request for create clickbank front page
router.post('/offers/:offer_id/pages/update-front', (req,res) => {
    var page = new Pages();
    page.name = req.body.name;
    page.slug = req.body.slug;
    page.cbskin = req.body.cbskin;
    page.cbfid = req.body.cbfid;
    page.type = 'front';
    page.pid1 = req.body.pid1;
    page.pid2 = req.body.pid2;
    page.pid3 = req.body.pid3;
    page.pid4 = req.body.pid4;
    page.pid5 = req.body.pid5;
    page.pid6 = req.body.pid6;
    page.offer_id = req.params.offer_id;
    page.save((err, doc) => {
        if (!err) {
            // var offer_dir = `./views/offers-public/${req.body.shop}/${req.body.slug}/${req.body.platform}`;
            // if (!fs.existsSync(offer_dir))
            //     fs.mkdirSync(offer_dir, {recursive: true});

            res.redirect('/admin/offers/' + req.params.offer_id + '/pages/');
        }
        else
            console.log('Error during record insertion : ' + err);
    });

    // console.log('dsfdsfds');
});

// route for delete an offer
router.get('/offers/:offer_id/pages/delete/:page_id', (req, res) => {
    Pages.findByIdAndRemove(req.params.page_id, (err, doc) => {
        res.redirect('/admin/offers/' + req.params.offer_id + '/pages/');
    });
});

// END_OF_PAGES_SECTION //

// OFFERS_SECTION //

// route for create / edit offer
router.post('/offers/update', (req,res) => {
    // create new offer
    if (req.body._id == '') {
        var offer = new Offers();
        offer.name = req.body.name;
        offer.slug = req.body.slug;
        offer.shop = req.body.shop;
        offer.platform = req.body.platform;
        offer.ga_tracking = req.body.ga_tracking;
        offer.vendor = req.body.vendor;
        offer.save((err, doc) => {
            var offer_dir = `./views/offers-public/${req.body.shop}/${req.body.slug}/${req.body.platform}`;
            if (!fs.existsSync(offer_dir))
                fs.mkdirSync(offer_dir, {recursive: true});

            res.redirect('/admin/offers/list');
        });
    }

    // update an existing offer
    else {
        Offers.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
            res.redirect('/admin/offers/list');
        });
    }
});

// route for delete an offer
router.get('/offers/delete/:id', (req, res) => {
    Offers.findByIdAndRemove(req.params.id, (err, doc) => {
        res.redirect('/admin/offers/list');
    });
});

// END_OF_OFFERS_SECTION //

////////////////////////
// END_OF_POST_ROUTES //
////////////////////////

// export routes
module.exports = router;
