import { useState, useEffect } from 'react';
import {   useParams } from "react-router-dom";
import styled from 'styled-components';

import colors from 'styles/colors';
import Heading from 'components/Form/Heading';
import Card from 'components/Form/Card';
import ServerLocationCard from 'components/Results/ServerLocation';
import ServerInfoCard from 'components/Results/ServerInfo';
import HostNamesCard from 'components/Results/HostNames';
import WhoIsCard from 'components/Results/WhoIs';
import BuiltWithCard from 'components/Results/BuiltWith';
import LighthouseCard from 'components/Results/Lighthouse';
import ScreenshotCard from 'components/Results/Screenshot';
import SslCertCard from 'components/Results/SslCert';
import HeadersCard from 'components/Results/Headers';
import CookiesCard from 'components/Results/Cookies';
import RobotsTxtCard from 'components/Results/RobotsTxt';
import DnsRecordsCard from 'components/Results/DnsRecords';
import keys from 'utils/get-keys';
import { determineAddressType, AddressType } from 'utils/address-type-checker';

import {
  getLocation, ServerLocation,
  getServerInfo, ServerInfo,
  getHostNames, HostNames,
  makeTechnologies, TechnologyGroup,
  parseCookies, Cookie,
  parseRobotsTxt,
  Whois,
} from 'utils/result-processor';

const ResultsOuter = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultsContent = styled.section`
  width: 95vw;

  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;
  margin: auto;
  width: calc(100% - 2rem);
  padding-bottom: 1rem;
`;

const Header = styled(Card)`
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  padding: 0.5rem 1rem;
`;

const Results = (): JSX.Element => {
  const [ serverInfo, setServerInfo ] = useState<ServerInfo>();
  const [ hostNames, setHostNames ] = useState<HostNames | null>();
  const [ locationResults, setLocationResults ] = useState<ServerLocation>();
  const [ whoIsResults, setWhoIsResults ] = useState<Whois>();
  const [ technologyResults, setTechnologyResults ] = useState<TechnologyGroup[]>();
  const [ lighthouseResults, setLighthouseResults ] = useState<any>();
  const [ sslResults, setSslResults ] = useState<any>();
  const [ headersResults, setHeadersResults ] = useState<any>();
  const [ dnsResults, setDnsResults ] = useState<any>();
  const [ robotsTxtResults, setRobotsTxtResults ] = useState<any>();
  const [ cookieResults, setCookieResults ] = useState<Cookie[] | null>(null);
  const [ screenshotResult, setScreenshotResult ] = useState<string>();
  const [ ipAddress, setIpAddress ] = useState<undefined | string>(undefined);
  const [ addressType, setAddressType ] = useState<AddressType>('empt');
  const { address } = useParams();

  type LoadingState = 'loading' | 'skipped' | 'success' | 'error';

  interface LoadingJob {
    name: string,
    state: LoadingState,
    error?: string,
  }

  const jobNames = [
    'get-ip',
    'ssl',
    'dns',
    'cookies',
    'robots-txt',
    'headers',
    'lighthouse',
    'location',
    'server-info',
    'whois',
  ] as const;

  const initialJobs = jobNames.map((job: string) => {
    return {
      name: job,
      state: 'loading' as LoadingState,
    }
  });

  const [ loadingJobs, setLoadingJobs ] = useState<LoadingJob[]>(initialJobs);

  const updateLoadingJobs = (job: string, newState: LoadingState, error?: string) => {
    setLoadingJobs((prevJobs) => {
      const newJobs = prevJobs.map((loadingJob: LoadingJob) => {
        if (loadingJob.name === job) {
          return { ...loadingJob, error, state: newState };
        }
        return loadingJob;
      });
  
      if (newState === 'error') {
        console.warn(`Error in ${job}: ${error}`);
      }
  
      return newJobs;
    });
  };
  
  

  useEffect(() => {
    setAddressType(determineAddressType(address || ''));
    if (addressType === 'ipV4') {
      setIpAddress(address);
    }
  }, []);

  /* Get IP address from URL */
  useEffect(() => {
    if (addressType !== 'url') return;
    const fetchIpAddress = () => {
      fetch(`/find-url-ip?address=${address}`)
      .then(function(response) {
        response.json().then(jsonData => {
          setIpAddress(jsonData.ip);
          updateLoadingJobs('get-ip', 'success');
        });
      })
      .catch(function(error) {
        updateLoadingJobs('get-ip', 'error', error);
      });
    };
    if (!ipAddress) {
      fetchIpAddress();
    }
  }, [address, addressType]);

  /* Get SSL info */
  useEffect(() => {
    if (addressType !== 'url') return;
    fetch(`/ssl-check?url=${address}`)
      .then(response => response.json())
      .then(response => {
        if (Object.keys(response).length > 0) {
          setSslResults(response);
          updateLoadingJobs('ssl', 'success');
        } else {
          updateLoadingJobs('ssl', 'error', 'No SSL Cert found');
        }
      })
      .catch(err => updateLoadingJobs('ssl', 'error', err));
  }, [address, addressType])

  /* Get Cookies */
  useEffect(() => {
    if (addressType !== 'url') return;
    fetch(`/get-cookies?url=${address}`)
      .then(response => response.json())
      .then(response => {
        setCookieResults(parseCookies(response.cookies));
        updateLoadingJobs('cookies', 'success');
      })
      .catch(err => updateLoadingJobs('cookies', 'error', err));
  }, [address, addressType])

  /* Get Robots.txt */
  useEffect(() => {
    if (addressType !== 'url') return;
    fetch(`/read-robots-txt?url=${address}`)
      .then(response => response.text())
      .then(response => {
        setRobotsTxtResults(parseRobotsTxt(response));
        updateLoadingJobs('robots-txt', 'success');
      })
      .catch(err => updateLoadingJobs('robots-txt', 'error', err));
  }, [address, addressType])

  /* Get Headers */
  useEffect(() => {
    if (addressType !== 'url') return;
    fetch(`/get-headers?url=${address}`)
      .then(response => response.json())
      .then(response => {
        setHeadersResults(response);
        updateLoadingJobs('headers', 'success');
      })
      .catch(err => updateLoadingJobs('headers', 'error', err));
  }, [address, addressType])

  /* Get DNS records */
  useEffect(() => {
    if (addressType !== 'url') return;
    fetch(`/get-dns?url=${address}`)
      .then(response => response.json())
      .then(response => {
        setDnsResults(response);
        updateLoadingJobs('dns', 'success');
      })
      .catch(err => updateLoadingJobs('dns', 'error', err));
  }, [address, addressType])

  /* Get Lighthouse report */
  useEffect(() => {
    if (addressType !== 'url') return;
    fetch(`/lighthouse-report?url=${address}`)
      .then(response => response.json())
      .then(response => {
        setLighthouseResults(response.lighthouseResult);
        setScreenshotResult(response.lighthouseResult?.fullPageScreenshot?.screenshot?.data);
        updateLoadingJobs('lighthouse', 'success');
      })
      .catch(err => {
        // if (err.errorType === 'TimeoutError') {
        // Netlify limits to 10 seconds, we can try again client-side...
        const params = 'category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO&category=PWA&strategy=mobile';
        const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${address}&${params}&key=${keys.googleCloud}`;
        fetch(endpoint)
          .then(response => response.json())
          .then(response => {
            setLighthouseResults(response.lightHouseResult);
            setScreenshotResult(response?.lighthouseResult?.fullPageScreenshot?.screenshot?.data);
            updateLoadingJobs('lighthouse', 'success');
          })
          .catch(err => updateLoadingJobs('lighthouse', 'error', err));
      });
  }, [address, addressType])


  /* Get IP address location info */
  useEffect(() => {
    const fetchIpLocation = () => {
      fetch(`https://ipapi.co/${ipAddress}/json/`)
      .then(function(response) {
        response.json().then(jsonData => {
          setLocationResults(getLocation(jsonData));
          updateLoadingJobs('location', 'success');
        });
      })
      .catch(function(error) {
        updateLoadingJobs('location', 'error', error);
      });
    };
    if (ipAddress) {
      fetchIpLocation();
    }
  }, [ipAddress]);

  /* Get hostnames and server info from Shodan */
  useEffect(() => {
    const applyShodanResults = (response: any) => {
      setServerInfo(getServerInfo(response));
      setHostNames(getHostNames(response));
    }
    const fetchShodanData = () => {
      const apiKey = keys.shodan;
      fetch(`https://api.shodan.io/shodan/host/${ipAddress}?key=${apiKey}`)
        .then(response => response.json())
        .then(response => {
          if (!response.error) {
            applyShodanResults(response)
            updateLoadingJobs('server-info', 'success');
          }
        })
        .catch(err => updateLoadingJobs('server-info', 'error', err));
    };
    

    if (ipAddress) {
      fetchShodanData();
    }
  }, [ipAddress]);

  /* Get BuiltWith tech stack */
  useEffect(() => {
    if (addressType !== 'url') return;
    const apiKey = keys.builtWith;
    const endpoint = `https://api.builtwith.com/v21/api.json?KEY=${apiKey}&LOOKUP=${address}`;
    fetch(endpoint)
      .then(response => response.json())
      .then(response => {
        setTechnologyResults(makeTechnologies(response));
        updateLoadingJobs('built-with', 'success');
      })
      .catch(err => updateLoadingJobs('built-with', 'error', err));
  }, [address, addressType]);
  
  /* Get WhoIs info for a given domain name */
  useEffect(() => {
    if (addressType !== 'url') return;
    const applyWhoIsResults = (response: any) => {
      const whoIsResults: Whois = {
        created: response.date_created,
        expires: response.date_expires,
        updated: response.date_updated,
        nameservers: response.nameservers,
      };
      setWhoIsResults(whoIsResults);
    }
    const fetchWhoIsData = () => {
      const apiKey = keys.whoApi;
      fetch(`https://api.whoapi.com/?domain=${address}&r=whois&apikey=${apiKey}`)
        .then(response => response.json())
        .then(response => {
          if (!response.error) applyWhoIsResults(response)
          updateLoadingJobs('whois', 'success');
        })
        .catch(err => updateLoadingJobs('whois', 'error', err));
    };
    
    if (addressType === 'url') {
      fetchWhoIsData();
    }
  }, [addressType, address]);

  const makeSiteName = (address: string): string => {
    try {
      return new URL(address).hostname.replace('www.', '');
    } catch (error) {
      return address;
    }
  }
  
  return (
    <ResultsOuter>
      <Header as="header">
        <Heading color={colors.primary} size="large">
          <a href="/">Web Check</a>
        </Heading>
        { address && 
        <Heading color={colors.textColor} size="medium">
          { addressType === 'url' && <img width="32px" src={`https://icon.horse/icon/${makeSiteName(address)}`} alt="" /> }
          {makeSiteName(address)}
        </Heading>
        }
      </Header>
      <ResultsContent>
        { locationResults && <ServerLocationCard {...locationResults} />}
        { sslResults && <SslCertCard sslCert={sslResults} />}
        { headersResults && <HeadersCard headers={headersResults} />}
        { hostNames && <HostNamesCard hosts={hostNames} />}
        { whoIsResults && <WhoIsCard {...whoIsResults} />}
        { dnsResults && <DnsRecordsCard dnsRecords={dnsResults} />}
        { lighthouseResults && <LighthouseCard lighthouse={lighthouseResults} />}
        { cookieResults && <CookiesCard cookies={cookieResults} />}
        { screenshotResult && <ScreenshotCard screenshot={screenshotResult} />}
        { technologyResults && <BuiltWithCard technologies={technologyResults} />}
        { robotsTxtResults && <RobotsTxtCard robotTxt={robotsTxtResults} />}
        { serverInfo && <ServerInfoCard {...serverInfo} />}
        
      </ResultsContent>
    </ResultsOuter>
  );
}

export default Results;