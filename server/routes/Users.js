var express = require("express");
var router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Load User model
const Applicant = require("../models/applicant");
const Recruiter = require("../models/recruiter");
const Job = require("../models/job");
const Application = require("../models/application");
const applicant = require("../models/applicant");

// GET request 
// Getting all the users
router.get("/list_applicants", function (req, res) {
    Applicant.find(function (err, applicants) {
        if (err) {
            console.log(err);
        } else {
            res.json(applicants);
        }
    })
});

router.get("/list_recruiters", function (req, res) {
    Recruiter.find(function (err, recruiters) {
        if (err) {
            console.log(err);
        } else {
            res.json(recruiters);
        }
    })
});

// POST request 
// Add a user to db
router.post("/register", async (req, res) => {

    if (await userFind(req, res, Recruiter, 0)) {
        res.status(200).json({ error: 'Duplicate email' });
        return;
    }
    if (await userFind(req, res, Applicant, 0)) {
        res.status(200).json({ error: 'Duplicate email' });
        return;
    }
    if (req.body.choice == "A") {
        const newApplicant = new Applicant({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            education: req.body.education,
            skills: req.body.skills
        });
        console.log(newApplicant)
        newApplicant.save()
            .then(applicant => {
                res.status(200).json(applicant);
            })
            .catch(err => {
                console.log(err)
                res.status(400).send(err);
            });
    } else {
        const newRecruiter = new Recruiter({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            bio: req.body.bio,
            contactNo: req.body.contactNo
        });
        newRecruiter.save()
            .then(recruiter => {
                res.status(200).json(recruiter);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send(err);
            });
    }
});

// POST request 
// Login
router.post("/login", async (req, res) => {
    let a = await userFind(req, res, Recruiter, 1)
    if (a == true) return;
    let b = await userFind(req, res, Applicant, 1)
    if (b == true) return;
    res.status(200).json({ error: "Check email or password" });
});

router.route('/create_job').post(verifyToken, async function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            console.log(authData);
            if (authData.type != "recruiters") res.status(400).send("User is not a Recruiter");
            else {
                const newJob = new Job({
                    title: req.body.title,
                    availablePos: req.body.availablePos,
                    maxApplications: req.body.maxApplications,
                    dateOfPosting: req.body.dateOfPosting,
                    dateOfJoining: req.body.dateOfJoining,
                    deadline: req.body.deadline,
                    requiredSkills: req.body.requiredSkills,
                    jobType: req.body.jobType,
                    duration: req.body.duration,
                    salary: req.body.salary,
                    recruiterID: authData.user._id,
                    recruiterName: authData.user.name,
                    recruiterEmail: authData.user.email
                });
                console.log(newJob)
                newJob.save()
                    .then(job => {
                        res.status(200).json(job);
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(400).send(err);
                    });
            }
        }
    });
});

router.route('/delete_job').post(verifyToken, async function (req, res) {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            console.log(authData);
            if (authData.type != "recruiters") res.status(400).send("User is not a Recruiter");
            else {
                await Job.deleteOne({ _id : req.body.jobID }).exec(async function (err, job) {
                    if (err) console.log(err);
                    else res.status(200).json(job);
                });
                await Application.deleteOne({ jobID : req.body.jobID }).exec(async function (err, job) {
                    if (err) console.log(err);
                    else res.status(200).json(job);
                });
            }
        }
    });
});

router.route('/edit_job').post(verifyToken, async function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (authData.type != "recruiters") res.status(400).send("User is not a Recruiter");
            else {
                Job.findOneAndUpdate({ _id: req.body.jobID },
                    {
                        $set: {
                            maxApplications: req.body.maxApplications,
                            availablePos: req.body.availablePos,
                            deadline: req.body.deadline
                        }
                    }).lean().exec(
                        async function (err, job) {

                            if (err) console.log(err);
                            if (!job)
                                res.send("Job Not Found");
                            else
                                res.send("Job Updated Successfully");
                        });
            }
        }
    });
});

router.route('/my_listings').post(verifyToken, async function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (authData.type != "recruiters") res.status(400).send("User is not a Recruiter");
            else {
                console.log(authData.user.email);
                Job.find({ recruiterEmail: authData.user.email }).lean().exec(async function (err, jobs) {
                    if (err) console.log(err);
                    else {
                        res.status(200).json(jobs);
                    }
                })
            }
        }
    });
});

router.route('/all_jobs').post(verifyToken, async function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            // console.log(authData);
            if (authData.type != "applicants") res.status(400).send("User is not an Applicant");
            else {
                if (req.body.search != "") {
                    Job.find({ title: req.body.search }).lean().exec(async function (err, jobs) {
                        if (err) console.log(err);
                        else {
                            console.log(authData.user._id)
                            Applicant.find({_id: authData.user._id}).lean().exec(async function (err, applicant) {
                                if (err) console.log(err);
                                else {
                                    res.status(200).json({jobs , applicant});
                                }
                            });
                        }
                    });
                }
                else {
                    Job.find({}).lean().exec(async function (err, jobs) {
                        if (err) console.log(err);
                        else {
                            console.log(authData.user._id)
                            Applicant.find({_id: authData.user._id}).lean().exec(async function (err, applicant) {
                                if (err) console.log(err);
                                else {
                                    res.status(200).json({jobs , applicant});
                                }
                            });
                        }
                    });
                }
            }
        }
    });
});

router.route('/create_application').post(verifyToken, async function (req, res) {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            // console.log(authData);
            if (authData.type != "applicants") res.status(400).send("User is not an Applicant");
            else {
                console.log(authData.user._id)
                console.log(req.body.jobID)
                let a = await Application.find({ $and: [{ applicantID: authData.user._id }, { jobID: req.body.jobID }] }).count()
                let b = await Application.find({ applicantID: authData.user._id }).count()
                if (a > 0 || b >= 10) {
                    console.log(a, b)
                    res.status(400).send("Already applied to this job");
                    return;
                }
                const newApplication = new Application({
                    jobID: req.body.jobID,
                    recruiterID: req.body.recruiterID,
                    applicantID: authData.user._id,
                    dateOfApplication: req.body.dateOfApplication,
                    SOP: req.body.SOP
                });
                newApplication.save()
                    .then(application => {
                        res.status(200).json(application);
                        Job.findOneAndUpdate(
                            { "_id": req.body.jobID },
                            {
                                $inc: { "currentApplications": 1 }
                            },
                            async (err, prod) => {
                                console.log("reeee")
                                console.log(err);
                                console.log(prod)
                            }
                        )
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(400).send(err);
                    });

            }
        }
    });
});

router.route('/job_applications').post(verifyToken, async function (req, res) {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (authData.type != "recruiters") res.status(400).send("User is not a Recruiter");
            else {
                Application.find({ jobID: req.body.jobID }).lean().exec(async function (err, applications) {
                    if (err) console.log(err);
                    else {
                        let applicantIDs = applications.map(function (ele) { return ele.applicantID });
                        await Applicant.find({ _id: { $in: applicantIDs } }).lean().exec(async function (err, applicants) {
                            if (err) {
                                console.log(err);
                                res.sendStatus(403)
                            }
                            else {
                                res.status(200).json({ applicants, applications });
                            }
                        });
                    }
                });
            }
        }
    });
});

router.route('/accepted_applications').post(verifyToken, async function (req, res) {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (authData.type != "recruiters") res.status(400).send("User is not a Recruiter");
            else {
                Application.find({ recruiterID: authData.user._id, status: 2 }).lean().exec(async function (err, applications) {
                    if (err) console.log(err);
                    else {
                        let applicantIDs = applications.map(function (ele) { return ele.applicantID });
                        let jobIDs = applications.map(function (ele) { return ele.jobID });
                        console.log(jobIDs)
                        await Applicant.find({ _id: { $in: applicantIDs } }).lean().exec(async function (err, applicants) {
                            if (err) console.log(err);
                            else {
                                let newapplicants = []
                                for (var ind in applicantIDs) {
                                    let applicantID = applicantIDs[ind];
                                    for (var indu in applicants) {
                                        // console.log(jobs[indu]._id.toString() == jobID , ind , indu)
                                        if (applicants[indu]._id.toString() == applicantID) {
                                            newapplicants.push(applicants[indu])
                                        }
                                    }
                                }
                                await Job.find({ _id: { $in: jobIDs } }).lean().exec(async function (err, jobs) {
                                    if (err) console.log(err);
                                    else {
                                        console.log(jobs)
                                        let newjobs = []
                                        for (var ind in jobIDs) {
                                            let jobID = jobIDs[ind];
                                            for (var indu in jobs) {
                                                // console.log(jobs[indu]._id.toString() == jobID , ind , indu)
                                                if (jobs[indu]._id.toString() == jobID) {
                                                    newjobs.push(jobs[indu])
                                                }
                                            }
                                        }
                                        console.log(newjobs.length)
                                        res.status(200).json({ applicants: newapplicants, jobs: newjobs });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
});

router.route('/my_applications').post(verifyToken, async function (req, res) {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            console.log(err)
            res.sendStatus(403);
        } else {
            console.log(authData)
            if (authData.type != "applicants") res.status(400).send("User is not an Applicant");
            else {
                Application.find({ applicantID: authData.user._id }, { jobID: 1, _id: 0 }).lean().exec(async function (err, jobIDs) {
                    if (err) console.log(err);
                    else {
                        jobIDs = jobIDs.map(function (ele) { return ele.jobID });
                        await Job.find({ _id: { $in: jobIDs } }).lean().exec(async function (err, applications) {
                            if (err) console.log(err);
                            else {
                                res.status(200).json(applications);
                            }
                        });
                    }
                });
            }
        }
    });
});

router.route('/rate_job').post(verifyToken, async function (req, res) {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            console.log(err)
            res.sendStatus(403);
        } else {
            console.log(authData)
            if (authData.type != "applicants") res.status(400).send("User is not an Applicant");
            else {
                console.log(req.body);
                Job.findOneAndUpdate(
                    { "_id": req.body.jobID },
                    {
                        $inc: { "numRating": 1, "totalRating": Number(req.body.rating) }
                    },
                    async (err, prod) => {
                        console.log("reeee")
                        console.log(err);
                        console.log(prod)
                    }
                )
                res.send("Done");
            }
        }
    });
});

router.route('/rate_applicant').post(verifyToken, async function (req, res) {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            console.log(err)
            res.sendStatus(403);
        } else {
            console.log(authData)
            if (authData.type != "recruiters") res.status(400).send("User is not a Recruiter");
            else {
                console.log(req.body);
                Applicant.findOneAndUpdate(
                    { "_id": req.body.applicantID },
                    {
                        $inc: { "numRating": 1, "totalRating": Number(req.body.rating) }
                    },
                    async (err, prod) => {
                        console.log("reeee")
                        console.log(err);
                        console.log(prod)
                    }
                )
                res.send("Done");
            }
        }
    });
});


router.route('/change_status').post(verifyToken, async function (req, res) {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (authData.type != "recruiters") res.status(400).send("User is not a Recruiter");
            else {
                Application.findOneAndUpdate({ _id: req.body.applicationID },
                    {
                        $set: {
                            status: req.body.status
                        }
                    }).lean().exec(
                        function (err, application) {
                            if (err) console.log(err);
                            if (!application)
                                res.send("Application Not Found");
                            else
                                res.json(application);
                        });
            }
        }
    });
});

router.route('/reduce_job_position').post(verifyToken, async function (req, res) {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (authData.type != "recruiters") res.status(400).send("User is not a Recruiter");
            else {
                console.log(req.body.jobID)
                await Job.findOneAndUpdate({ _id: req.body.jobID },
                    {
                        $inc: {
                            availablePos: -1
                        }
                    }).exec(
                        function (err, job) {
                            console.log(job)
                            if (err) console.log(err);
                        });
                await Applicant.findOneAndUpdate({ _id: req.body.applicantID },
                    {
                        $set: {
                            accepted: true
                        }
                    }).exec(
                        function (err, job) {
                            console.log(job)
                            if (err) console.log(err);
                        });
                await Application.updateMany({ applicantID: req.body.applicantID },
                    {
                        $set: {
                            status: 3
                        }
                    }).exec(
                        function (err, job) {
                            console.log(job)
                            if (err) console.log(err);
                        });
                await Application.findOneAndUpdate({ jobID : req.body.jobID , applicantID: req.body.applicantID },
                    {
                        $set: {
                            status: 2
                        }
                    }).exec(
                        function (err, job) {
                            console.log(job)
                            if (err) console.log(err);
                        });
                res.send(200).status("Done")
            }
        }
    });
});


router.route('/all_applications').get(async function (req, res) {
    Application.find({}).lean().exec(async function (err, applications) {
        if (err) console.log(err);
        else {
            res.status(200).json(applications);
        }

    });
});



router.route('/profile_recruiter').post(verifyToken, async function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            console.log(authData);
            if (authData.type != "recruiters") res.status(400).send("User is not a Recruiter");
            else {
                Recruiter.find({ _id: req.body.id }).lean().exec(async function (err, recruiter) {
                    if (err) {
                        console.log(err);
                        res.status(400).send(err);
                    }
                    else {
                        res.status(200).json(recruiter);
                    }
                })
            }
        }
    });
});

router.route('/profile_recruiter_update').post(verifyToken, async function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            console.log(authData);
            if (authData.type != "recruiters") res.status(400).send("User is not a Recruiter");
            else {
                Recruiter.findOneAndUpdate({ _id: req.body.id },
                    {
                        $set: {
                            name: req.body.name,
                            email: req.body.email,
                            contactNo: req.body.contactNumber,
                            bio: req.body.bio
                        }
                    }).lean().exec(
                        async function (err, job) {
                            if (err) console.log(err);
                            if (!job)
                                res.send("Recruiter Not Found");
                            else
                                res.send("Recruiter Updated Successfully");
                        });
            }
        }
    });
});

router.route('/profile_applicant').post(verifyToken, async function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            console.log(authData);
            if (authData.type != "applicants") res.status(400).send("User is not a Applicant");
            else {
                Applicant.find({ _id: req.body.id }).lean().exec(async function (err, applicant) {
                    if (err) {
                        console.log(err);
                        res.status(400).send(err);
                    }
                    else {
                        res.status(200).json(applicant);
                    }
                })
            }
        }
    });
});

router.route('/profile_applicant_update').post(verifyToken, async function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            console.log(authData);
            if (authData.type != "applicants") res.status(400).send("User is not a Applicant");
            else {
                Applicant.findOneAndUpdate({ _id: req.body.id },
                    {
                        $set: {
                            name: req.body.name,
                            email: req.body.email,
                            contactNo: req.body.contactNumber,
                            bio: req.body.bio
                        }
                    }).lean().exec(
                        async function (err, job) {
                            if (err) console.log(err);
                            if (!job)
                                res.send("Recruiter Not Found");
                            else
                                res.send("Recruiter Updated Successfully");
                        });
            }
        }
    });
});
module.exports = router;

function verifyToken(req, res, next) {
    const token = req.headers['token'];
    if (typeof token !== 'undefined') {
        req.token = token;
        next()
    } else {
        res.sendStatus(403);
    }
}

userFind = async (req, res, DB, login) => {
    // console.log(DB)
    let user = await DB.findOne({ email: req.body.email })
    if (!login) {
        if (user != null)
            return true;
        else
            return false;
    }
    if (!user) return false;
    if (await bcrypt.compareSync(req.body.password, user.password) == false) {
        return false;
    }
    await jwt.sign({ user, "type": DB.collection.collectionName }, 'secretkey', (err, token) => {
        res.status(200).json({
            "type": DB.collection.collectionName,
            token,
            id: user._id,
        });
    });
    return true;

    // return await DB.findOne({ email: req.body.email }, async function (err, user) {
    //     if (err) {
    //         return false;
    //     }
    //     if (!login) {
    //         if (user != null) {
    //             return true;
    //         }
    //         else
    //             return false;
    //     }

    //     if (!user) return false;
    //     if (await bcrypt.compareSync(req.body.password, user.password) == false) {
    //         return false;
    //     }
    //     else {
    //         await jwt.sign({ user, "type": DB.collection.collectionName }, 'secretkey', (err, token) => {
    //             res.status(200).json({
    //                 "type": DB.collection.collectionName,
    //                 token
    //             });
    //         });
    //         return true;
    //     }
    // });
};