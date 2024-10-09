import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from '../interfaces/auth'; // Assuming this is the correct path
import { login } from '../models/login.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  // Sample login details and user mock data
  const mockLoginDetails: login = { email: 'test@example.com', password: 'password123' };
  const mockUserDetails: User = { id: '1', fullName: 'John Doe', email: 'john@example.com', password: 'password123' };
  const mockToken = 'dummy-token';
  const mockLoginResponse = { token: mockToken };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    sessionStorage.clear(); // Clear sessionStorage after each test to avoid interference
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#setToken, #getToken, #clearToken', () => {
    it('should store, retrieve, and clear the token from sessionStorage', () => {
      // Store the token
      service.setToken(mockToken);
      expect(sessionStorage.getItem('token')).toBe(mockToken);

      // Retrieve the token
      const retrievedToken = service.getToken();
      expect(retrievedToken).toBe(mockToken);

      // Clear the token
      service.clearToken();
      expect(sessionStorage.getItem('token')).toBeNull();
    });
  });

  describe('#registerUser', () => {
    it('should make a POST request to register a user', () => {
      service.registerUser(mockUserDetails).subscribe(response => {
        expect(response).toEqual(mockUserDetails);
      });

      const req = httpMock.expectOne(service['baseUrl1']);
      expect(req.request.method).toBe('POST');
      req.flush(mockUserDetails); // Simulate successful response
    });
  });

  describe('#Login', () => {
    it('should make a POST request to login a user and set Authorization header', () => {
      // Set the token in sessionStorage first
      service.setToken(mockToken);

      service.Login(mockLoginDetails).subscribe(response => {
        expect(response).toEqual(mockLoginResponse);
      });

      const req = httpMock.expectOne(service['baseUrl']);
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
      req.flush(mockLoginResponse); // Simulate successful response
    });
  });

  describe('#getUserByEmail', () => {
    it('should make a GET request to retrieve user by email', () => {
      const email = 'john@example.com';
      const mockUsers: User[] = [mockUserDetails];

      service.getUserByEmail(email).subscribe(users => {
        expect(users).toEqual(mockUsers);
      });

      const req = httpMock.expectOne(`${service['baseUrl']}/users?email=${email}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers); // Simulate successful response
    });
  });
});
