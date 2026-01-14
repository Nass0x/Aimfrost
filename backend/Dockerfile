FROM php:8.1-apache

RUN apt-get update && apt-get install -y \
    nmap \
    whois \
    dnsutils \
    curl \
    python3 \
    python3-pip \
    git \
    unzip \
    && rm -rf /var/lib/apt/lists/*


RUN git clone https://github.com/sherlock-project/sherlock.git /opt/sherlock \
    && cd /opt/sherlock && pip3 install -r requirements.txt --break-system-packages


COPY . /var/www/html/


RUN chown -R www-data:www-data /var/www/html
