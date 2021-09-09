package net.codejava;

import java.io.File;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/email/")
public class AppController {

	@Autowired
	private JavaMailSender mailSender;
	
	@GetMapping("")
	public String viewHomePage() {
		return "index";
	}
	
	@GetMapping("/send_text_email")
	public String sendPlainTextEmail(Model model) {
		String from = "codejava.net@gmail.com";
		String to = "teaminstaapproval123@gmail.com";
		
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(from);
		message.setTo(to);
		message.setSubject("This is a plain text email");
		message.setText("Hello guys! This is a plain text email.");
		
		mailSender.send(message);
		
		model.addAttribute("message", "A plain text email has been sent");
		return "result";
	}
	
	@GetMapping("/send_html_email")
	public String sendHTMLEmail(Model model) throws MessagingException {
		String from = "codejava.net@gmail.com";
		String to = "teaminstaapproval123@gmail.com";
		
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		
		helper.setSubject("Application Received!");
		helper.setFrom(from);
		helper.setTo(to);

		boolean html = true;
		helper.setText(htmlText, html);

		mailSender.send(message);
		
		model.addAttribute("message", "An HTML email has been sent");
		return "result";		
	}

	@GetMapping("/send_html_approved_email")
	public String sendHTMLApprovedEmail(Model model) throws MessagingException {
		String from = "codejava.net@gmail.com";
		String to = "teaminstaapproval123@gmail.com";

		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);

		helper.setSubject("Loan Approved!");
		helper.setFrom(from);
		helper.setTo(to);

		boolean html = true;
		helper.setText(htmlLoanApproved, html);

		mailSender.send(message);

		model.addAttribute("message", "An HTML email has been sent");
		return "result";
	}
	
	@GetMapping("/send_email_attachment")
	public String sendHTMLEmailWithAttachment(Model model) throws MessagingException {
		
		String from = "codejava.net@gmail.com";
		String to = "teaminstaapproval123@gmail.com";
		
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		
		helper.setSubject("Here's your e-book");
		helper.setFrom(from);
		helper.setTo(to);
		
		helper.setText("<b>Dear friend</b>,<br><i>Please find the book attached.</i>", true);
		
		FileSystemResource file = new FileSystemResource(new File("/Users/divyagahlot/Downloads/impdoc.pdf"));
		helper.addAttachment("FreelanceSuccess.pdf", file);

		mailSender.send(message);
		
		model.addAttribute("message", "An HTML email with attachment has been sent");
		return "result";		
	}
	
	@GetMapping("/send_email_inline_image")
	public String sendHTMLEmailWithInlineImage(Model model) throws MessagingException {
		
		String from = "codejava.net@gmail.com";
		String to = "hainatu@gmail.com";
		
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		
		helper.setSubject("Here's your pic");
		helper.setFrom(from);
		helper.setTo(to);
		
		String content = "<b>Dear guru</b>,<br><i>Please look at this nice picture:.</i>"
							+ "<br><img src='cid:image001'/><br><b>Best Regards</b>"; 
		helper.setText(content, true);
		
		FileSystemResource resource = new FileSystemResource(new File("g:\\MyEbooks\\Freelance for Programmers\\images\\admiration.png"));
		helper.addInline("image001", resource);

		mailSender.send(message);
		
		model.addAttribute("message", "An HTML email with inline image has been sent");
		return "result";		
	}

	private String htmlText = "<style>\n" +
			"html {\n" +
			"    display: table;\n" +
			"    margin: auto;\n" +
			"}\n" +
			"\n" +
			"body {\n" +
			"    display: table-cell;\n" +
			"    vertical-align: middle;\n" +
			"}\n" +
			"</style>\n" +
			"<html>\n" +
			"    <body>\n" +
			"    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width:600px;margin-left: 20%;\" width=\"100%\" class=\"wrapperBody\">\n" +
			"        <tr>\n" +
			"            <td style=\"align:center\" valign=\"top\">\n" +
			"\n" +
			"                <!-- Table Card Open // -->\n" +
			"                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\"\n" +
			"                    style=\"background-color:#FFFFFF;border-color:#E5E5E5; border-style:solid; border-width:0 1px 1px 1px;\"\n" +
			"                    width=\"100%\" class=\"tableCard\">\n" +
			"\n" +
			"                    <tr>\n" +
			"                        <td height=\"3\" style=\"background-color:#7600e5;font-size:1px;line-height:3px;\"\n" +
			"                            class=\"topBorder\">\n" +
			"                            &nbsp;</td>\n" +
			"                    </tr>\n" +
			"\n" +
			"                    <tr>\n" +
			"                        \n" +
			"                        \n" +
			"                    </tr>\n" +
			"                    \n" +
			"                    <tr>\n" +
			"                        <td height=\"3\" style=\"background-color:#7600e5;font-size:1px;line-height:60px;\">\n" +
			"                            &nbsp;</td>\n" +
			"                    </tr>\n" +
			"                    \n" +
			"\n" +
			"                    <tr>\n" +
			"                        <td align=\"center\" valign=\"top\" style=\"padding-bottom:5px;padding-left:20px;padding-right:20px;\"\n" +
			"                            class=\"mainTitle\">\n" +
			"                            <!-- Main Title Text // -->\n" +
			"                            <p class=\"text\"\n" +
			"                                style=\"padding-top: 30px; color:#56189e; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:18px; font-weight:500; font-style:normal; letter-spacing:normal; line-height:16px; text-transform:none; text-align:center; ; margin:0\">\n" +
			"                                Greetings from the Instaloan Family :)\n" +
			"                            </p>\n" +
			"                            <p class=\"text\"\n" +
			"                                style=\"padding-top: 50px; color:#000000; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:48px; font-weight:500; font-style:normal; letter-spacing:normal; line-height:36px; text-transform:none; text-align:center; ; margin:0\">\n" +
			"                                Application Received!\n" +
			"                            </p>\n" +
			"                        </td>\n" +
			"                    </tr>\n" +
			"\n" +
			"                    <tr>\n" +
			"                        <td align=\"center\" valign=\"top\" style=\"padding: 20px\" class=\"subTitle\">\n" +
			"\n" +
			"                            <!-- Sub Title Text // -->\n" +
			"                            <h4 class=\"text\"\n" +
			"                                style=\"color:#666666; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:16px; font-weight:500; font-style:normal; letter-spacing:normal; line-height:24px; text-transform:none; text-align:center; padding:0; margin:0;\">\n" +
			"                                Thank you for applying with us. We will verify your documents and contact you soon.\n" +
			"                            </h4>\n" +
			"                        </td>\n" +
			"                    </tr>\n" +
			"\n" +
			"                    <tr>\n" +
			"                        <td align=\"center\" valign=\"top\" style=\"padding-left:20px;padding-right:20px;\"\n" +
			"                            class=\"containtTable\">\n" +
			"\n" +
			"                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" class=\"tablCatagoryLinks\">\n" +
			"                                <tr>\n" +
			"                                    <td align=\"center\" valign=\"top\" style=\"padding-bottom:20px;\" class=\"catagoryLinks\">\n" +
			"\n" +
			"                                        <div style=\"display:inline-block;\">\n" +
			"                                            <img src=\"http://weekly.grapestheme.com/notify/img/icons/catagory-1.png\"\n" +
			"                                                alt=\"\" width=\"60\" border=\"0\"\n" +
			"                                                style=\"height:auto; width:100%; max-width:60px; margin-left:2px; margin-right:2px\" />\n" +
			"                                        </div>\n" +
			"\n" +
			"                                        <div style=\"display:inline-block;\">\n" +
			"                                            <img src=\"http://weekly.grapestheme.com/notify/img/icons/catagory-2.png\"\n" +
			"                                                alt=\"\" width=\"60\" border=\"0\"\n" +
			"                                                style=\"height:auto; width:100%; max-width:60px; margin-left:2px; margin-right:2px\" />\n" +
			"                                        </div>\n" +
			"\n" +
			"                                        <div style=\"display:inline-block;\">\n" +
			"                                            <img src=\"http://weekly.grapestheme.com/notify/img/icons/catagory-3.png\"\n" +
			"                                                alt=\"\" width=\"60\" border=\"0\"\n" +
			"                                                style=\"height:auto; width:100%; max-width:60px; margin-left:2px; margin-right:2px\" />\n" +
			"                                        </div>\n" +
			"\n" +
			"                                        <div style=\"display:inline-block;\">\n" +
			"                                            <img src=\"http://weekly.grapestheme.com/notify/img/icons/catagory-4.png\"\n" +
			"                                                alt=\"\" width=\"60\" border=\"0\"\n" +
			"                                                style=\"height:auto; width:100%; max-width:60px; margin-left:2px; margin-right:2px\" />\n" +
			"                                        </div>\n" +
			"                                    </td>\n" +
			"                                </tr>\n" +
			"                            </table>\n" +
			"\n" +
			"                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"\n" +
			"                                class=\"tableTitleDescription\">\n" +
			"                                <tr>\n" +
			"                                    <td align=\"center\" valign=\"top\" style=\"padding-bottom:10px;\" class=\"mediumTitle\">\n" +
			"                                        <!-- Medium Title Text // -->\n" +
			"                                        <p class=\"text\"\n" +
			"                                            style=\"color:#000000; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:20px; font-weight:500; font-style:normal; letter-spacing:normal; line-height:16px; text-transform:none; text-align:center; padding:0; margin:0\">\n" +
			"                                            We will reach out to you within\n" +
			"                                        </p>\n" +
			"                                        <p class=\"text\"\n" +
			"                                            style=\"color:#000000; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:28px; font-weight:500; font-style:normal; letter-spacing:normal; line-height:16px; text-transform:none; text-align:center; padding:0;\">\n" +
			"                                            48 Hours!\n" +
			"                                        </p>\n" +
			"                                    </td>\n" +
			"                                </tr>\n" +
			"                            </table>\n" +
			"\n" +
			"                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" class=\"tableButton\">\n" +
			"                                <tr>\n" +
			"                                    <td align=\"center\" valign=\"top\" style=\"padding-top:20px;padding-bottom:20px;\">\n" +
			"\n" +
			"                                        <!-- Button Table // -->\n" +
			"                                        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
			"                                            <tr>\n" +
			"                                                <p class=\"text\"\n" +
			"                                                style=\"color:#666666; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:14px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:22px; text-transform:none; text-align:center; padding:0; margin:0\">\n" +
			"                                            In the meantime, make sure to check out our website to see what's new and\n" +
			"                                            browse all types of loan services offered!</p><br/>\n" +
			"                                            </tr>\n" +
			"                                            <tr>\n" +
			"                                                <td align=\"center\" class=\"ctaButton\"\n" +
			"                                                    style=\"background-color:#7600e5;;padding-top:12px;padding-bottom:12px;padding-left: 35px; padding-right: 35px; width: 150px;border-radius:50px\">\n" +
			"                                                    \n" +
			"                                                    <!-- Button Link // -->\n" +
			"                                                    <a class=\"text\" href=\"http://localhost:4200/home\" target=\"_blank\"\n" +
			"                                                        style=\"color:#FFFFFF; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:13px; font-weight:600; font-style:normal;letter-spacing:1px; width: 200px; line-height:20px; text-transform:uppercase; text-decoration:none; display:block\">\n" +
			"                                                        Explore Now!\n" +
			"                                                    </a>\n" +
			"                                                </td>\n" +
			"                                            </tr>\n" +
			"                                        </table>\n" +
			"\n" +
			"                                    </td>\n" +
			"                                </tr>\n" +
			"                            </table>\n" +
			"\n" +
			"                            <table>\n" +

			"\n" +
			"                                <tr>\n" +
			"                        <td align=\"center\" valign=\"top\" class=\"imgHero\">\n" +
			"                            <img src=\"https://image.freepik.com/free-vector/people-protecting-their-cash_74855-5553.jpg\" width=\"600\" alt=\"\" border=\"0\"\n" +
			"                                style=\"width:90%; max-width:600px; height:auto; display:block;\" />\n" +
			"\n" +
			"                        </td>\n" +
			"                                    </tr><tr><td align=\"center\" valign=\"top\" style=\"padding-bottom:20px;\" class=\"description\">\n" +

			"                                        <!-- Description Text// -->\n" +
			"                                        <p class=\"text\"\n" +
			"                                            style=\"color:#666666; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:14px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:22px; text-transform:none; text-align:center; padding:0; margin:0\">\n" +
			"                                            Thank you for joining with Insta, We have more than 6 Lakh Loan Applicants\n" +
			"                                            from all over the world.\n" +
			"                                            Now that you are soon to be the member of this amazing fam, feel free to\n" +
			"                                            reach out to us in case you have any queries regarding the process. We\n" +
			"                                            promise to stay by your side until the end!\n" +
			"                                            <br /><br />\n" +
			"                                        </p>\n" +
			"                                    </td>\n" +
			"                                </tr>\n" +
			"                            </table>\n" +
			"\n" +
			"                            \n" +
			"\n" +
			"                        </td>\n" +
			"                    </tr>\n" +
			"\n" +
			"                    <tr>\n" +
			"                        <td height=\"20\" style=\"font-size:1px;line-height:1px;\">&nbsp;</td>\n" +
			"                    </tr>\n" +
			"\n" +
			"                    <tr>\n" +
			"                        <td height=\"20\" style=\"font-size:1px;line-height:1px;\">&nbsp;</td>\n" +
			"                    </tr>\n" +
			"                </table>\n" +
			"                <!-- Table Card Close// -->\n" +
			"\n" +
			"                <!-- Space -->\n" +
			"                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" class=\"space\">\n" +
			"                    <tr>\n" +
			"                        <td height=\"30\" style=\"font-size:1px;line-height:1px;\">&nbsp;</td>\n" +
			"                    </tr>\n" +
			"                </table>\n" +
			"\n" +
			"            </td>\n" +
			"        </tr>\n" +
			"</body>\n" +
			"</html>";

	private String htmlLoanApproved = "<style>\n" +
			"    html {\n" +
			"        display: table;\n" +
			"        margin: auto;\n" +
			"    }\n" +
			"    \n" +
			"    body {\n" +
			"        display: table-cell;\n" +
			"        vertical-align: middle;\n" +
			"    }\n" +
			"    </style>\n" +
			"    <html>\n" +
			"        <body>\n" +
			"        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width:600px; margin-left: 20%;\" width=\"100%\" class=\"wrapperBody\">\n" +
			"            <tr>\n" +
			"                <td style=\"align:center\" valign=\"top\">\n" +
			"    \n" +
			"                    <!-- Table Card Open // -->\n" +
			"                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\"\n" +
			"                        style=\"background-color:#FFFFFF;border-color:#E5E5E5; border-style:solid; border-width:0 1px 1px 1px;\"\n" +
			"                        width=\"100%\" class=\"tableCard\">\n" +
			"    \n" +
			"                        <tr>\n" +
			"                            <td height=\"3\" style=\"background-color:#7600e5;font-size:1px;line-height:3px;\"\n" +
			"                                class=\"topBorder\">\n" +
			"                                &nbsp;</td>\n" +
			"                        </tr>\n" +
			"                        \n" +
			"                        <tr>\n" +
			"                            <td height=\"3\" style=\"background-color:#7600e5;font-size:1px;line-height:60px;\">\n" +
			"                                &nbsp;</td>\n" +
			"                        </tr>\n" +
			"                        \n" +
			"    \n" +
			"                        <tr>\n" +
			"                            <td align=\"center\" valign=\"top\" style=\"padding-bottom:5px;z-index: 200!important;position: relative\"\n" +
			"                                class=\"mainTitle\">\n" +
			"                                <!-- Main Title Text // -->\n" +
			"                                <p class=\"text\"\n" +
			"                                    style=\"padding-top: 30px; color:#56189e; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:18px; font-weight:500; font-style:normal; letter-spacing:normal; line-height:16px; text-transform:none; text-align:center; ; margin:0\">\n" +
			"                                    Greetings from the Instaloan Family :)\n" +
			"                                </p>\n" +
			"                                <p class=\"text\"\n" +
			"                                    style=\"padding-top: 50px; color:#000000; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:48px; font-weight:500; font-style:normal; letter-spacing:normal; line-height:36px; text-transform:none; text-align:center; ; margin:0\">\n" +
			"                                    Loan Approved!\n" +
			"                                </p>\n" +
			"                            </td>\n" +
			"                        </tr>\n" +
			"                        <tr>\n" +
			"                            <td align=\"center\" valign=\"top\" class=\"imgHero\">\n" +
			"                                <img src=\"https://thumbs.gfycat.com/QuaintLikelyFlyingfish-size_restricted.gif\" width=\"600\" alt=\"\" border=\"0\"\n" +
			"                                    style=\"width:100%; max-width:600px; height:auto;margin-top: 0px;\" />\n" +
			"    \n" +
			"                            </td>\n" +
			"                            \n" +
			"                            \n" +
			"                        </tr>\n" +
			"    \n" +
			"                        <tr>\n" +
			"                            <td align=\"center\" valign=\"top\" style=\"padding: 20px; \" class=\"subTitle\">\n" +
			"    \n" +
			"                                <!-- Sub Title Text // -->\n" +
			"                                <h4 class=\"text\"\n" +
			"                                    style=\"color:#666666; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:16px; font-weight:500; font-style:normal; letter-spacing:normal; line-height:24px; text-transform:none; text-align:center; padding:0; margin:0;\">\n" +
			"                                    Congratulations, your loan is now approved and backed by investors!\n" +
			"                                    Your funds will now be sent to your bank. We will contact you shortly to gather your bank details for the same. \n" +
			"                                    <br/>\n" +
			"                                    Please note that your bank may take\n" +
			"                                    upto 4 additional business days to reflect the loan in your account.\n" +
			"                                </h4>\n" +
			"                            </td>\n" +
			"                        </tr>\n" +
			"\n" +
			"    \n" +
			"                        <tr>\n" +
			"                            <td align=\"center\" valign=\"top\" class=\"imgHero\">\n" +
			"                                <img src=\"https://image.freepik.com/free-vector/group-young-people-posing-photo_52683-18823.jpg\" width=\"600\" alt=\"\" border=\"0\"\n" +
			"                                    style=\"width:100%; max-width:600px; height:auto; display:block;\" />\n" +
			"    \n" +
			"                            </td>\n" +
			"                            \n" +
			"                            \n" +
			"                        </tr>\n" +
			"\n" +
			"                        <tr>\n" +
			"                            <td  valign=\"top\" style=\"padding: 20px\" class=\"subTitle\">\n" +
			"    \n" +
			"                                <!-- Sub Title Text // -->\n" +
			"                                <h4 class=\"text\"\n" +
			"                                    style=\"color:#666666; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:16px; font-weight:500; font-style:normal; letter-spacing:normal; line-height:24px; text-transform:none; text-align:center; padding:0; margin:0;\">\n" +
			"                                    \n" +
			"\n" +
			"                                    As we continue to work together, you can access your account information by visiting your <a href = \"#\">Account summary</a>. \n" +
			"                                    <br/>\n" +
			"                                    <br/>\n" +
			"                                    You can also access all of your loan documents and authorizations in the <a>Loan Documents</a> section of your account.\n" +
			"\n" +
			"                                    Welcome to the Instaloan Club!\n" +
			"                                    \n" +
			"                                </h4>\n" +
			"                            </td>\n" +
			"                        </tr>\n" +
			"    \n" +
			"                        <tr>\n" +
			"                            <td align=\"center\" valign=\"top\" style=\"padding-left:20px;padding-right:20px;\"\n" +
			"                                class=\"containtTable\">\n" +
			"    \n" +
			"                                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" class=\"tablCatagoryLinks\">\n" +
			"                                    <tr>\n" +
			"                                        <td align=\"center\" valign=\"top\" style=\"padding-bottom:20px;\" class=\"catagoryLinks\">\n" +
			"    \n" +
			"                                            <div style=\"display:inline-block;\">\n" +
			"                                                <img src=\"http://weekly.grapestheme.com/notify/img/icons/catagory-1.png\"\n" +
			"                                                    alt=\"\" width=\"60\" border=\"0\"\n" +
			"                                                    style=\"height:auto; width:100%; max-width:60px; margin-left:2px; margin-right:2px\" />\n" +
			"                                            </div>\n" +
			"    \n" +
			"                                            <div style=\"display:inline-block;\">\n" +
			"                                                <img src=\"http://weekly.grapestheme.com/notify/img/icons/catagory-2.png\"\n" +
			"                                                    alt=\"\" width=\"60\" border=\"0\"\n" +
			"                                                    style=\"height:auto; width:100%; max-width:60px; margin-left:2px; margin-right:2px\" />\n" +
			"                                            </div>\n" +
			"    \n" +
			"                                            <div style=\"display:inline-block;\">\n" +
			"                                                <img src=\"http://weekly.grapestheme.com/notify/img/icons/catagory-3.png\"\n" +
			"                                                    alt=\"\" width=\"60\" border=\"0\"\n" +
			"                                                    style=\"height:auto; width:100%; max-width:60px; margin-left:2px; margin-right:2px\" />\n" +
			"                                            </div>\n" +
			"    \n" +
			"                                            <div style=\"display:inline-block;\">\n" +
			"                                                <img src=\"http://weekly.grapestheme.com/notify/img/icons/catagory-4.png\"\n" +
			"                                                    alt=\"\" width=\"60\" border=\"0\"\n" +
			"                                                    style=\"height:auto; width:100%; max-width:60px; margin-left:2px; margin-right:2px\" />\n" +
			"                                            </div>\n" +
			"                                        </td>\n" +
			"                                    </tr>\n" +
			"                                </table>\n" +
			"    \n" +
			"                                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" class=\"tableButton\">\n" +
			"                                    <tr>\n" +
			"                                        <td align=\"center\" valign=\"top\" style=\"padding-top:20px;padding-bottom:20px;\">\n" +
			"    \n" +
			"                                            <!-- Button Table // -->\n" +
			"                                            <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
			"                                                <tr>\n" +
			"                                                    <h4 class=\"text\"\n" +
			"                                    style=\"color:#666666; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:16px; font-weight:500; font-style:normal; letter-spacing:normal; line-height:24px; text-transform:none; text-align:center; padding:0; margin:0;\">\n" +
			"                                                In the meantime, make sure to check out our website to see what's new and\n" +
			"                                                browse all types of loan services offered!</h4><br/>\n" +
			"                                                </tr>\n" +
			"                                                <tr>\n" +
			"                                                    <td align=\"center\" class=\"ctaButton\"\n" +
			"                                                        style=\"background-color:#7600e5;;padding-top:12px;padding-bottom:12px;padding-left:35px;padding-right:35px;border-radius:50px\">\n" +
			"                                                        \n" +
			"                                                        <!-- Button Link // -->\n" +
			"                                                        <a class=\"text\" href=\"#\" target=\"_blank\"\n" +
			"                                                            style=\"color:#FFFFFF; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:13px; font-weight:600; font-style:normal;letter-spacing:1px; line-height:20px; text-transform:uppercase; text-decoration:none; display:block\">\n" +
			"                                                            Explore Now!\n" +
			"                                                        </a>\n" +
			"                                                    </td>\n" +
			"                                                </tr>\n" +
			"                                            </table>\n" +
			"    \n" +
			"                                        </td>\n" +
			"                                    </tr>\n" +
			"                                </table>\n" +
			"    \n" +
			"                                <table>\n" +
			"    \n" +
			"                                    <tr>\n" +
			"                                        <td align=\"center\" valign=\"top\" style=\"padding-bottom:20px;\" class=\"description\">\n" +
			"                                            <!-- Description Text// -->\n" +
			"                                            <p class=\"text\"\n" +
			"                                                style=\"color:#666666; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:14px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:22px; text-transform:none; text-align:center; padding:0; margin:0\">\n" +
			"                                                Thank you for joining with Insta, We have more than 6 Lakh Loan Applicants\n" +
			"                                                from all over the world.\n" +
			"                                                Now that you are soon to be the member of this amazing fam, feel free to\n" +
			"                                                reach out to us in case you have any queries regarding the process. We\n" +
			"                                                promise to stay by your side until the end!<br/><br/>\n" +
			"                                                All the best, <br/>\n" +
			"                                                Instaloan Team.\n" +
			"                                                <br /><br />\n" +
			"                                            </p>\n" +
			"                                        </td>\n" +
			"                                    </tr>\n" +
			"                                </table>\n" +
			"    \n" +
			"                                \n" +
			"    \n" +
			"                            </td>\n" +
			"                        </tr>\n" +
			"    \n" +
			"                        <tr>\n" +
			"                            <td height=\"20\" style=\"font-size:1px;line-height:1px;\">&nbsp;</td>\n" +
			"                        </tr>\n" +
			"    \n" +
			"                        <tr>\n" +
			"                            <td height=\"20\" style=\"font-size:1px;line-height:1px;\">&nbsp;</td>\n" +
			"                        </tr>\n" +
			"                    </table>\n" +
			"                    <!-- Table Card Close// -->\n" +
			"    \n" +
			"                    <!-- Space -->\n" +
			"                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" class=\"space\">\n" +
			"                        <tr>\n" +
			"                            <td height=\"30\" style=\"font-size:1px;line-height:1px;\">&nbsp;</td>\n" +
			"                        </tr>\n" +
			"                    </table>\n" +
			"    \n" +
			"                </td>\n" +
			"            </tr>\n" +
			"    </body>\n" +
			"    </html>";
}
