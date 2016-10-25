//article domain 객체
function Article(t, c, w) {

	var num = 0;
	var title = t; 
	var content = c;
	var writer = w;
	var readCount = 0;

	this.getNum = function() {
		
		return num;
		
	};
	
	this.setNum = function(n) {
		
		num = n;
		
	};

	this.getTitle = function() {
		
		return title;
		
	};

	this.setTitle = function(t) {
		
		title = t;
		
	};

	this.getContent = function() {
		
		return content;
		
	};

	this.setContent = function(c) {
		
		content = c;
		
	};
	
	this.getWriter = function() {
		
		return writer;
		
	};

	this.setWriter = function(w) {
		
		writer = writer;
		
	};
	
	this.getReadCount = function() {
		
		return readCount;
		
	};

	this.setReadCount = function(rc) {
		
		readCount = rc;
		
	};

}

//article dao 객체
function ArticleDao() {
	
//	글저장 dao 메서드
	this.saveDao = function(article) {
				
		var isSuccess;
		
		try{	
			//요청 정보를 설정 및 서버 호출
			var requestString = '/save?title=' + article.getTitle() + '&content=' + article.getContent() + '&writer=' + article.getWriter();						
			var request = new XMLHttpRequest();
			request.open('GET', requestString, false);
			request.send();
			isSuccess = eval('(' + request.responseText + ')');			
			
		} catch(e) {
			console.log('ArticleDao 객체 : saveDao 메서드에서 예외 발생');
			console.log(e.message);
		}
		
		return isSuccess;
		
	};
	
//	글목록 dao 메서드
	this.selectAllDao = function() {
				
		var articles;
		
		try{
			//요청 정보를 설정 및 서버 호출
			var requestString = '/selectAll';
			var request = new XMLHttpRequest();
			request.open('GET', requestString, false);
			request.send();			
			
			//요청 결과(동기식 결과 받음)를 응답받는 것을 출력
			articles = eval('(' + request.responseText + ')');
		} catch(e) {
			console.log('ArticleDao 객체 : selectAllDao 메서드에서 예외 발생');
			console.log(e.message);
		}	
		
		return articles;
		
	};
	
}

//article controller 객체
function ArticleController() {

	var dao = new ArticleDao();	
	
//	글쓰기뷰 controller 메서드
	this.requestWriteView = function() {
		
		document.location = "writeView.html";	
		
	};
	
//	글저장 controller 메서드
	this.requestSave = function(article) {
		
		var isSuccess = dao.saveDao(article);
		
		if(isSuccess.message = true) {
			alert('글 저장 성공');
		} else {
			alert('글 저장 실패');
		}
		
		document.location = 'selectAllView.html';
		
	};
	
//	글목록 controller 메서드
	this.requestSelectAll = function() {
		
		var articles = dao.selectAllDao();
		return articles;
		
	};
	
}

//controller 객체(static)
var Controllers = function() {	
		
};

Controllers.articleController = new ArticleController();

Controllers.getArticleController = function() {

	return Controllers.articleController;

};