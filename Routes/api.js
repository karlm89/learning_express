const express = require('express')
const router = express.Router()
const uuid = require('uuid')

const members = require('../Models/Members')

// Get All Members
router.get('/members', (req, res) => {
  res.json(members)
})

// Get a single member
router.get('/members/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id))

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)))
  } else {
    res
      .status(400)
      .json({ msg: `No member not with the id of ${req.params.id}` })
  }
})

// Create a new member
router.post('/members', (req, res) => {
  // res.send(req.body)
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active',
  }

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please, include a name and email' })
  }

  members.push(newMember)

  res.json(members)
})

// Update Member
router.put('/members/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id))

  if (found) {
    const memberUpd = req.body
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = memberUpd.name ? memberUpd.name : member.name
        member.email = memberUpd.email ? memberUpd.email : member.email
        res.json({ msg: `${member.name} has been updated`, member })
      }
    })
    res.json(members.filter((member) => member.id === parseInt(req.params.id)))
  } else {
    res
      .status(400)
      .json({ msg: `No member not with the id of ${req.params.id}` })
  }
})

// Delete a member
router.delete('/members/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id))

  if (found) {
    res.json({
      msg: 'Member deleted',
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    })
  } else {
    res
      .status(400)
      .json({ msg: `No member not with the id of ${req.params.id}` })
  }
})

module.exports = router
