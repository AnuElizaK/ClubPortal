//CRUDE OPERATIONS
const express = require ('express')
const mongoose= require('mongoose')
const UserModel = require('./models/User.js')
const ClubMembers = require('./models/Clubmembers.js')
const Eventmembers = require('./models/Eventmembers.js')
const Eventinfo = require ('./models/Eventinfo.js')
const Clubinfo = require ('./models/Clubinfo.js')
const Announcementinfo = require ('./models/announcementinfo')
const cors = require ('cors')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' }) // Directory to store uploaded files


const app=express()
const port=3000

app.use(cors())

//to handle json data
app.use(express.json())

main()
  .then(()=>console.log("DB Connected"))
  .catch(err=>console.log(err))

async function main() {
    await mongoose.connect('mongodb+srv://anuek005:opsOfYI9FYsf1NFM@cluster0.l4vopgs.mongodb.net/ClubPortal')
}

app.use('/uploads', express.static('uploads'));
// enrollement form users
app.post('/enrolls',async(req,res)=>{
    try{
        var newenrollment={
            name: req.body.name,
            rollNo: req.body.rollNo,
            dept: req.body.dept, 
            contactNumber: req.body.contactNumber,
            clubName: req.body.clubName,
            email:req.body.email}
        var enrollmentdata = new ClubMembers(newenrollment)                                      
        await enrollmentdata.save()    
                
       res.status(201).json({success:true,
                            message:'enrolled',}) 
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Enrollment failed',
            error: error.message
        });
    }
})

//Event form users
app.post('/eventsreg',async (req,res)=>{
    try {
        var neweventmember={
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            reg:req.body.reg,
            club:req.body.club,
            title:req.body.title
        }
        var eventmemb= new Eventmembers(neweventmember) //create an instance
        await eventmemb.save()
        res.status(201).json({success:true,
            message:'registration sucessfull',})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
})


//to show events info from db
app.get('/eventsinfo',async(req,res)=>{
    try{
        const eventinfo=await Eventinfo.find({})
        res.status(200).json(eventinfo)
    }
    catch(error){
        console.error(error)
        res.status(500).json({error:error})
    }
})

//to show individual club info from db
app.get('/clubinfos/:clubId', async (req, res) => {
    try {
      const { clubId } = req.params;
      const clubinfo = await Clubinfo.findById(clubId);
      if (!clubinfo) {
        return res.status(404).json({ message: 'Club not found' });
      }
      res.json(clubinfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// to show all club data
app.get('/clubinfos', async (req, res) => {
  try {
    
    const clubsinfo = await Clubinfo.find();

    const clubsWithMemberCounts = await Promise.all(
      clubsinfo.map(async (club) => {
        const memberCount = await ClubMembers.countDocuments({ clubName: club.name });
        return {
          ...club.toObject(),
          members: memberCount
        };
      })
    );
    res.json(clubsWithMemberCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

  //to show all announcement infos
  app.get('/announcementinfo', async (req, res) => {
    try {
        const { clubId } = req.query; // Get clubId from query parameters
        const filter = clubId ? { clubId } : {}; // Apply filter if clubId exists
        const annoinfo = await Announcementinfo.find(filter);
        res.status(200).json(annoinfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Admin: Create event
app.post("/events", upload.single("event_image"), async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      event_image: req.file ? `uploads/${req.file.filename}` : "", // Save relative path
    };
    const newEvent = new Eventinfo(eventData);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(400).json({ message: err.message });
  }
});


// Admin: Update event
app.patch("/events/:id", upload.single("event_image"), async (req, res) => {
  try {
    const eventId = req.params.id;
    // Build updated event data
    const updatedData = {
      ...req.body,
    };
    // If new image is uploaded, update the image path
    if (req.file) {
      updatedData.event_image = `uploads/${req.file.filename}`;
    }
    // Update the event in DB
    const updatedEvent = await Eventinfo.findByIdAndUpdate(eventId, updatedData, {
      new: true,
    });
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(updatedEvent);
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(400).json({ message: err.message });
  }
});

  
  // Admin: Delete event
  app.delete('/events/:id', async (req, res) => {
    try {
      const deletedEvent = await Eventinfo.findByIdAndDelete(req.params.id);
      if(!deletedEvent) return res.status(404).json({message:'User not found'})
        res.status(200).json({message:'Event deleted successfully'})
    } 
    catch(error){
        console.error(error)
        res.status(500).json({error:error})
    }
  });

  // Add new announcement (admin only)
app.post("/announcementinfo", async (req, res) => {
    try {
      const newAnnouncement = new Announcementinfo(req.body);
      await newAnnouncement.save();
      res.status(201).json(newAnnouncement);
    } catch (error) {
      res.status(500).json({ error: "Error adding announcement" });
    }
  });
  
  // Edit existing announcement (admin only)
  app.patch("/announcementinfo/:id",  async (req, res) => {
    try {
      const updatedAnnouncement = await Announcementinfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedAnnouncement) {
        return res.status(404).json({ message: "Announcement not found" });
      }
      res.json(updatedAnnouncement);
    } catch (error) {
      res.status(500).json({ error: "Error updating announcement" });
    }
  });
  
  // Delete announcement (admin only)
  app.delete("/announcementinfo/:id", async (req, res) => {
    try {
      const deletedAnnouncement = await Announcementinfo.findByIdAndDelete(req.params.id);
      if (!deletedAnnouncement) {
        return res.status(404).json({ message: "Announcement not found" });
      }
      res.json({ message: "Announcement deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting announcement" });
    }
  });
  
// Admin: Particular club members
app.get('/users',async(req,res)=>{
  try{
    const amembers = await ClubMembers.find({})
    res.status(200).json(amembers)
  }
  catch(error){
      console.error(error)
      res.status(500).json({error:error})
  }
})

// Admin :Remove a particular member
app.delete('/users/:id', async (req, res) => {
  try {
    await ClubMembers.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete user" });
  }
});

// Update club info 
app.patch('/clubinfos', upload.array('photos'), async (req, res) => {
  // Serve static files from the uploads directory
  try {
    const { id, name, description, mission, vision, phone, email } = req.body;
    const photos = req.files || [];
    
    if (!id) {
      return res.status(400).json({ message: 'Club ID is required' });
    }

    // Build the update object
    const updateFields = {
      ...(name && { name }), // Allow updating the name
      ...(description && { description }),
      ...(mission && { mission }),
      ...(vision && { vision }),
      ...(phone && { phone }),
      ...(email && { email }),
      // ...(photos.length > 0 && { gallery: photos.map((photo) => photo.path) }),//gallery
      ...(photos.length > 0 && { logo: photos[0].path }),

    };

    const existingClub = await Clubinfo.findById(id);
    if (!existingClub) {
      return res.status(404).json({ message: 'Club not found' });
    }
    
    const oldName = existingClub.name; // Capture old name before updating
    
    const updatedClub = await Clubinfo.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );
    
    if (name && oldName !== name) {
      await Eventinfo.updateMany({ event_club: oldName }, { $set: { event_club: name } });
      await Announcementinfo.updateMany({ club: oldName }, { $set: { club: name } });
      await ClubMembers.updateMany({ clubName: oldName }, { $set: { clubName: name } });
      await Eventmembers.updateMany({ club: oldName }, { $set: { club: name } });
      await UserModel.updateMany({ club: oldName }, { $set: { club: name } });
    }

    res.status(200).json({ message: 'Club info updated successfully', club: updatedClub });
  } catch (error) {
    console.error('Error updating club info:', error);
    res.status(500).json({ message: 'Failed to update club info', error: error.message });
  }
});


//Super Admin:dashboard stats
app.get('/stats', async (req, res) => {
    try {
        const totalUsers = await UserModel.countDocuments();
        const totalClubs = await Clubinfo.countDocuments();
        const totalAdmins = await UserModel.countDocuments({ role: 'Admin' });
        const totalMembers = await ClubMembers.countDocuments();
       

        res.status(200).json({
            totalUsers,
            totalClubs,
            totalAdmins,
            totalMembers,
            
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//Super Admin:Delete a club
app.delete('/clubinfos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClub = await Clubinfo.findByIdAndDelete(id);
        if (!deletedClub) {
            return res.status(404).json({ message: 'Club not found' });
        }
        res.status(200).json({ message: 'Club deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//Super Admin:Create new Club
app.post('/clubinfos', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newClub = new Clubinfo({ name,email });
        await newClub.save();
        res.status(201).json(newClub);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//Super admin:Get all users
app.get('/superadmin/users', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//Super admin:create new user
app.post('/superadmin/users', async (req, res) => {
    try {
        const { name, email, password, role, regno, phone, club, clubId } = req.body;
        const newUser = new UserModel({ name, email, password, role, regno, phone, club, clubId });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//Super admin:Delete a user
app.delete('/superadmin/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//Super admin:Update user
app.patch('/superadmin/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        } 
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//super admin:collapsible table
app.get('/clubs-with-stats', async (req, res) => {
  try {
    const clubs = await Clubinfo.find();

    const enrichedClubs = await Promise.all(
      clubs.map(async (club) => {
        const memberCount = await ClubMembers.countDocuments({ clubName: club.name });
        const adminCount = await UserModel.countDocuments({ role: 'Admin', club: club.name });

        return {
          ...club._doc,
          members: memberCount,
          admins: adminCount
        };
      })
    );

    res.json(enrichedClubs);
  } catch (error) {
    console.error("Error building club stats:", error);
    res.status(500).json({ message: 'Failed to load club statistics' });
  }
});


//Login Route
app.post('/users/login', async (req, res) => {
    try {
        const { email, password, role } = req.body; // Capture role from request body
        // Check if a user exists with this email
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'User not Found' });
        }
        // If user exists, check password
        if (user.password === password) {
            return res.status(200).json({
                message: "Login Successful",
                role: user.role,
                name: user.name,
                email: user.email,
                regno: user.regno,
                contact: user.phone,
                club: user.club, 
                clubId: user.clubId,
            });
        } else {
            return res.status(400).json({ message: 'Invalid Password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port,()=>{
    console.log("Server started...")
})