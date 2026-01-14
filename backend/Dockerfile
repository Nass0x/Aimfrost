FROM php:8.1-apache


RUN apt-get update && apt-get install -y \
    nmap whois python3 python3-pip golang git curl \
    && rm -rf /var/lib/apt/lists/*


RUN go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest \
    && go install -v github.com/projectdiscovery/naabu/v2/cmd/naabu@latest \
    && go install -v github.com/projectdiscovery/dnsx/cmd/dnsx@latest \
    && go install -v github.com/projectdiscovery/tlsx/cmd/tlsx@latest


RUN cp /root/go/bin/* /usr/local/bin/


RUN git clone https://github.com/sherlock-project/sherlock.git /opt/sherlock \
    && cd /opt/sherlock && pip3 install -r requirements.txt --break-system-packages


COPY . /var/www/html/


RUN chown -R www-data:www-data /var/www/html
