/*******************************************************************************
 * Functions for websocket
 * Fork from original by profdetech
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/


namespace esp8266 {
    /**
     * Upload data to a websocket server 
     * @param writeip id url du server web.
     * @param idvaleur .
     * @param valeur .
     */
    //% subcategory="Websocket"
    //% weight=30
    //% blockGap=8
    //% blockId=esp8266_upload_websocket
    //% block="Envoyer les data au serveur WEB|saisir l'adresse IP ou DNS du serveur %writeip|id valeur %idvaleur|valeur %valeur"
    export function uploadwebsocket(   writeip: string,
                                    idvaleur: string,
                                    valeur: string   ) {

        // Make sure the WiFi is connected.
        if (isWifiConnected() == false) return

        // Connect to ThingSpeak. Return if failed.
        if (sendCommand("AT+CIPSTART=\"TCP\",\"" + writeip + "\",80", "OK", 10000) == false) return

        // Construct the data to send.
        // exemple 
        // http://172.22.194.4/datas.php?val=002
        // http://writeipwriteip/datas.php?idvaleur=valeur 

        let data = "GET /datas.php?" + idvaleur + "=" + valeur
        
        // Send the data.
        sendCommand("AT+CIPSEND=" + (data.length + 2))
        sendCommand(data)
        
        // Return if "SEND OK" is not received.
        if (getResponse("SEND OK", 1000) == "") return
        
        return
    }
}