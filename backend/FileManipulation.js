


const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const express = require("express");
const fs = require('fs')

const structure = {
    pdf: {},
    csv: {},
    image: {}
};

//Function that can create sub directories
const create = (dir, structure, cb = null) => {
    const path = require('path');
    cb = (cb => (...a) => setTimeout(() => cb.apply(null, a)))(cb);
    const subdirs = Reflect.ownKeys(structure);

    if (subdirs.length) {
        const sub = subdirs[0];
        const pth = path.join(dir, sub);
        const subsub = structure[sub];
        const copy = Object.assign({}, structure);
        delete copy[sub];

        fs.mkdir(pth, err => {
            if (err) return cb(err);
            create(pth, subsub, err => {
                if (err) return cb(err);
                create(dir, copy, cb);
            });
        });
    } else {
        cb(null);
    }
};



//Create Downloads Directory 
 const fileCreateDownloads = async () => {


    let userIds = await knex.select('id', 'file_id')
        .from("Users")
        .then(data => data)

    const download_path = "./user_files/downloads";

    fs.access(download_path, (error) => {

        // To check if the given directory 
        // already exists or not
        if (error) {
            // If current directory does not exist
            // then create it
            fs.mkdir(download_path, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    userIds.map(user => {
                        let filepath = `./user_files/downloads/${user.id}_${user.file_id}`;
                        fs.access(filepath, (error) => {

                            // To check if the given directory 
                            // already exists or not
                            if (error) {
                                // If current directory does not exist
                                // then create it
                                return fs.mkdir(filepath, (error) => {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                       return create(filepath, structure, err => {
                                            if (err) console.log(err);
                                            else { return "Nothing else"};
                                        });
                                        console.log("New Directory created successfully !!"); return "Nothing else";
                                    }
                                });
                            } else {
                                console.log(`${user.id} Directory already exists !!`); return "Nothing else";
                            }
                        })
                    })

                }
            });
        } else {
             return "Nothing else";
        }
    });




}

const fileCreateUploads = async () => {


    let userIds = await knex.select('id', 'file_id')
        .from("Users")
        .then(data => data)

    const upload_path = "./user_files/uploads";

    fs.access(upload_path, (error) => {

        // To check if the given directory 
        // already exists or not
        if (error) {
            // If current directory does not exist
            // then create it
            fs.mkdir(upload_path, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    userIds.map(user => {
                        let filepath = `./user_files/uploads/${user.id}_${user.file_id}`;
                        fs.access(filepath, (error) => {

                            // To check if the given directory 
                            // already exists or not
                            if (error) {
                                // If current directory does not exist
                                // then create it
                               return fs.mkdir(filepath, (error) => {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                       return create(filepath, structure, err => {
                                            if (err) console.log(err);
                                            else{ return "Nothing else"}
                                        });
                                        console.log("New Directory created successfully !!"); return "Nothing else";
                                    }
                                });
                            } else {
                                console.log(`${user.id} Directory already exists !!`); return "Nothing else";
                            }
                        })
                    })

                }
            });
        } else {
            return "Nothing else";
        }
    });




}

module.exports = { fileCreateDownloads, fileCreateUploads };
