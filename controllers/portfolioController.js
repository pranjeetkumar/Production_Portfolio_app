const nodemailer = require('nodemailer')
const sendGridTransport = require('nodemailer-sendgrid-transport')


// transport

const transporter = nodemailer.createTransport(
    sendGridTransport({
        auth:{
            api_key: process.env.API_SENDGRID
        },
    })
);


const sendEmailController = (req,res) => {
    try {

        const {name, email, msg} = req.body

        // validation

        if(!name || !email || !msg){
            return res.status(500).send({
                success:false,
                message:'Please Provide All Fields'
            })
        }

        //email matter

        transporter.sendMail({
            to:'pranjeetkumarmahto@gmail.com',
            from:'pranjeetkumarmahto@gmail.com',
            subject:'Portfolio_app Message',
            html:`
            <h5>Detail Information</h5>
            <ul>
                <li>
                    <p>Name : ${name} </p>
                    <p>Email : ${email} </p>
                    <p>Message : ${msg} </p>
                </li>
            </ul>
            `
        })
        return res.status(200).send({
            success:true,
            message:"Your Message send Successfully"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Send Email API Error',
            error
        })
        
    }
}



module.exports = { sendEmailController };