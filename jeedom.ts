/*******************************************************************************
 * Functions for jeedom
 * Fork from original by profdetech
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/


namespace esp8266 {
   

    /**
     * Upload data to a jeedom server 
     * @param writeApiKey jeedom Write API Key.
     * @param idjeedom .
     * @param valeur .
     */
    //% subcategory="Jeedom"
    //% weight=30
    //% blockGap=8
    //% blockId=esp8266_upload_jeedom
    //% block="Envoyer les data a jeedom|saisir l'adresse IP ou DNS du serveur %writeip|saisir la cle API %writeApiKey|id jeedom %idjeedom||valeur %valeur"
    export function uploadjeedom(   writeip: string,
										writeApiKey: string,
                                        idjeedom: number,
                                        valeur: number   ) {

        

        // Make sure the WiFi is connected.
        if (isWifiConnected() == false) return

        // Connect to ThingSpeak. Return if failed.
        if (sendCommand("AT+CIPSTART=\"TCP\",\"" + writeip + "\",80", "OK", 10000) == false) return

        // Construct the data to send.
		// exemple 
		//https://172.16.8.200/core/api/jeeApi.php?plugin=virtual&apikey=xxxxxxxxxxxxxxxxxxxxxxxxx&type=virtual&id=2717&value=10 
			
        let data = "GET /core/api/jeeApi.php?plugin=virtual&apikey=" + writeApiKey + "&type=virtual&id=" + idjeedom + "&value=" + valeur
        
        // Send the data.
        sendCommand("AT+CIPSEND=" + (data.length + 2))
        sendCommand(data)
        
        // Return if "SEND OK" is not received.
        if (getResponse("SEND OK", 1000) == "") return
        
        return
    }
}