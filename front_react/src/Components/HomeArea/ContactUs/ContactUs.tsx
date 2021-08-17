import "./ContactUs.css";
import { Button, ButtonGroup, Checkbox, FormControlLabel, TextField, Typography } from "@material-ui/core";
import { MailOutline, Send, Cancel } from "@material-ui/icons";
function ContactUs(): JSX.Element {
    return (
        <div className="ContactUs LoginBox">

            <Typography variant="h3" className="Headline"> <MailOutline /> Contact Us</Typography>

            <TextField label="Name" variant="outlined" className="TextBox" />
            <br />

            <TextField label="Email" variant="outlined" type="email" className="TextBox" />
            <br />

            <TextField label="Message" variant="outlined" className="TextBox" />
            <br />

            <FormControlLabel label="Send me promotional emails" control={<Checkbox />} />
            <br />

            <ButtonGroup variant="contained" fullWidth>
                <Button className="black" color="primary" startIcon={<Send />}>Send</Button>
                <Button className="black" color="secondary" startIcon={<Cancel />}>Cancel</Button>
            </ButtonGroup>

        </div>
    );
}

export default ContactUs;