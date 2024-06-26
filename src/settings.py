import os
from pathlib import Path
# from utils.logger import APILogger

# APILogger.setup_logging()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-si6lz2n9meuhcm()666oxbizi@t109t2tapfh08n(knajzjube'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1','tdcldizcva002.ebiz.verizon.com','https://tdcldizcva002.ebiz.verizon.com','https://ssologinuat.ebiz.verizon.com:443/ngauth','https://tdcldizcva002.ebiz.verizon.com:8446/agentapp','https://tdcldizcva002.ebiz.verizon.com:8446/agentapp/notification.jsp']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',

    'ui',
    'onecorp',
    'dtran',
    'MLE',
    'onecorp_restart',
    'selfserve2_app',
    'corsheaders',
]

CSRF_COOKIE_SECURE = False
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES' : ['rest_framework.authentication.TokenAuthentication',
                                        ],
}

CORS_ORIGIN_ALLOW_ALL=True

CSRF_TRUSTED_ORIGINS = ['https://tdcldizcva002.ebiz.verizon.com/dataQuality/','http://tdcldizcva002.ebiz.verizon.com/dataQuality/']

MIDDLEWARE = [
    # 'dqaas_api.middleware.api_key_middleware.APILogMiddleware',
    # 'dqaas_api.middleware.api_key_middleware.APIKeyMiddleware',
	
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'dqaas_api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'dqaas_api.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "selfserve_2/static/"),
)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'api.log',
            'formatter': 'custom',
        },
    },
    'formatters': {
        'custom': {
            'format': '%(asctime)s [%(levelname)s] - %(message)s',
        },
    },
    'loggers': {
        'api_logger': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}

MEDIA_URL = '/ml_profiler/result_dir/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'ml_profiler/result_dir')
