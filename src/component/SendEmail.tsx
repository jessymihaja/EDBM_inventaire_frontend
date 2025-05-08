import emailjs from "emailjs-com";
import { BonProps } from "../page/PossessionPage";

export const sendEmail = (employeEmail: string, bonDetails: BonProps) => {
    const detailsHTML = bonDetails.detailBonDetentions
        .map(
            (detail) =>
                ` ${detail.refarticle.iddetailEntree.idarticle.designation} - Réf: ${detail.refarticle.refarticle}  |`
        )
        .join("");

    const templateParams = {
        to_email: employeEmail,
        bon_id: bonDetails.id,
        date_bon: bonDetails.dateBon,
        date_fin: bonDetails.dateFin || "En cours",
        details: detailsHTML,
    };

    emailjs
        .send(
            "service_txbvrem", //Service ID
            "template_6gwyamh", //Template ID
            templateParams,
            "wMvO7hIiEg8Ql0twP" //User ID (public)
        )
        .then(
            (result) => {
                console.log("Email envoyé avec succès :", result.text,employeEmail);
            },
            (error) => {
                console.error("Erreur lors de l'envoi de l'email :", error.text);
            }
        );
};