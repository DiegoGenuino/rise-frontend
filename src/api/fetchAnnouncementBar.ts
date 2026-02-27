export async function fetchAnnouncementBar() {
    const announcementBarQuery = `
query AnnouncementBar {
  announcements {
    edges {
      node {
        announcementFields {
          admessage
          adbackgroundcolor
          adlink {
            target
            title
            url
          }
          enableannouncement
        }
      }
    }
  }
}`;

    try {
        const response = await fetch("https://cms.riseidiomas.com.br/graphql", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ query: announcementBarQuery }),
        });

        const dados = await response.json();
        console.log(
            "dados recebidos:",
            dados.data?.announcements?.edges[0]?.node?.announcementFields,
        );

        const announcementData =
            dados.data?.announcements?.edges[0]?.node?.announcementFields;

        // Dados para exibir na AnnouncementBar
        const isEnabled = announcementData?.enableannouncement;
        const announcementText =
            announcementData?.admessage || "Bem vindo a Rise Idiomas";
        const announcementBgColor =
            announcementData?.adbackgroundcolor || "bg-[#E6FF2C]/70";

        const linkObject = announcementData?.adlink || {};
        const announcementUrl = linkObject.url || "#";
        const announcementTarget = linkObject.target || "_self";
        const announcementTitle = linkObject.title || "Saiba mais";

        const displayAnnouncementBar = isEnabled && announcementText !== "";

        return {
            displayAnnouncementBar,
            announcementText,
            announcementBgColor,
            announcementUrl,
            announcementTarget,
            announcementTitle,
        };
    } catch (error) {
        console.error("Error fetching announcement bar data:", error);
        return {
            displayAnnouncementBar: false,
            announcementText: null,
            announcementBgColor: null,
            announcementUrl: null,
            announcementTarget: null,
            announcementTitle: null,
        };
    }
}
