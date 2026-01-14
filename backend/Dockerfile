FROM php:8.1-apache


RUN apt-get update && apt-get install -y \
    nmap whois python3 python3-pip curl git \
    && rm -rf /var/lib/apt/lists/*



RUN curl -sL https://github.com/projectdiscovery/subfinder/releases/download/v2.6.6/subfinder_2.6.6_linux_amd64.zip -o subfinder.zip \
    && apt-get update && apt-get install -y unzip && unzip subfinder.zip && mv subfinder /usr/local/bin/ && rm subfinder.zip


RUN curl -sL https://github.com/projectdiscovery/naabu/releases/download/v2.3.1/naabu_2.3.1_linux_amd64.zip -o naabu.zip \
    && unzip naabu.zip && mv naabu /usr/local/bin/ && rm naabu.zip


RUN git clone https://github.com/sherlock-project/sherlock.git /opt/sherlock \
    && cd /opt/sherlock && pip3 install -r requirements.txt --break-system-packages


COPY . /var/www/html/


RUN chown -R www-data:www-data /var/www/html
